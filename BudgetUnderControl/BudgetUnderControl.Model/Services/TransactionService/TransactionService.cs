﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BudgetUnderControl.Common;
using BudgetUnderControl.Common.Enums;
using BudgetUnderControl.Contracts.Models;
using BudgetUnderControl.Domain;
using BudgetUnderControl.Domain.Repositiories;

namespace BudgetUnderControl.Model.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository transactionRepository;
        public TransactionService(ITransactionRepository transactionRepository)
        {
            this.transactionRepository = transactionRepository;
        }

        public async Task<ICollection<TransactionListItemDTO>> GetTransactionsAsync(TransactionsFilter filter = null)
        {
            var transactions = await this.transactionRepository.GetTransactionsAsync(filter);
            var dtos = transactions.Select(t => new TransactionListItemDTO
            {
                AccountId = t.AccountId,
                Date = t.Date,
                Id = t.Id,
                Value = t.Amount,
                Account = t.Account.Name,
                ValueWithCurrency = t.Amount + t.Account.Currency.Symbol,
                Type = t.Type,
                Name = t.Name,
                CurrencyCode = t.Account.Currency.Code,
                IsTransfer = t.IsTransfer
            }).ToList();

            return dtos;
        }

        public async Task<ObservableCollection<ObservableGroupCollection<string, TransactionListItemDTO>>> GetGroupedTransactionsAsync(TransactionsFilter filter = null)
        {
            var transactions = await this.transactionRepository.GetTransactionsAsync(filter);

            var dtos = transactions.Select(t => new TransactionListItemDTO
            {
                AccountId = t.AccountId,
                Date = t.Date,
                Id = t.Id,
                Value = t.Amount,
                Account = t.Account.Name,
                ValueWithCurrency = t.Amount + t.Account.Currency.Symbol,
                Type = t.Type,
                Name = t.Name,
                CurrencyCode = t.Account.Currency.Code,
                IsTransfer = t.IsTransfer
            }).OrderByDescending(x => x.Date)
                                .GroupBy(x => x.Date.ToString("d MMM yyyy"))
                                .Select(x => new ObservableGroupCollection<string, TransactionListItemDTO>(x))
                                .ToList();

            return new ObservableCollection<ObservableGroupCollection<string, TransactionListItemDTO>>(dtos);
        }

        public async Task AddTransactionAsync(AddTransactionDTO item)
        {
            var transaction = Transaction.Create(item.AccountId, item.Type, item.Amount, item.CreatedOn, item.Name, item.Comment, item.CategoryId);

            await this.transactionRepository.AddTransactionAsync(transaction);
        }

        public async Task EditTransactionAsync(EditTransactionDTO arg)
        {
            var firstTransaction = await this.transactionRepository.GetTransactionAsync(arg.Id);
            Transaction secondTransaction = null;

            await transactionRepository.UpdateAsync(firstTransaction);

            var transfer = await transactionRepository.GetTransferAsync(arg.Id); 

            if (transfer != null)
            {
                var secondTRansactionId = transfer.ToTransactionId != arg.Id ? transfer.ToTransactionId : transfer.FromTransactionId;
                secondTransaction = await this.transactionRepository.GetTransactionAsync(transfer.ToTransactionId);
            }

            //remove transfer, no more transfer
            if (arg.ExtendedType != ExtendedTransactionType.Transfer
                && transfer != null && secondTransaction != null)
            {
                await this.transactionRepository.RemoveTransferAsync(transfer);
                await this.transactionRepository.RemoveTransactionAsync(secondTransaction);
                firstTransaction.Edit(arg.AccountId, arg.Type, arg.Amount, arg.Date, arg.Name, arg.Comment, arg.CategoryId);
                await this.transactionRepository.UpdateAsync(firstTransaction);
            }
            //new Transfer, no transfer before
            else if (arg.ExtendedType == ExtendedTransactionType.Transfer
                && transfer == null && secondTransaction == null)
            {
                firstTransaction.Edit(arg.AccountId, TransactionType.Expense, arg.Amount, arg.Date, arg.Name, arg.Comment, arg.CategoryId);
                await this.transactionRepository.UpdateAsync(firstTransaction);

                var transactionIncome = Transaction.Create(arg.TransferAccountId.Value, TransactionType.Income, arg.TransferAmount.Value, arg.TransferDate.Value, arg.Name, arg.Comment, arg.CategoryId);
                await transactionRepository.AddTransactionAsync(transactionIncome);

                var newTransfer = Transfer.Create(firstTransaction.Id, transactionIncome.Id, arg.Rate.Value);
                await transactionRepository.AddTransferAsync(newTransfer);

            }

            //edit transfer
            else if (arg.ExtendedType == Common.Enums.ExtendedTransactionType.Transfer
                && transfer != null && secondTransaction != null)
            {
                firstTransaction.Edit(arg.AccountId, TransactionType.Expense, arg.Amount, arg.Date, arg.Name, arg.Comment, arg.CategoryId);
                await this.transactionRepository.UpdateAsync(firstTransaction);

                secondTransaction.Edit(arg.TransferAccountId.Value, TransactionType.Income, arg.TransferAmount.Value, arg.TransferDate.Value, arg.Name, arg.Comment, arg.CategoryId);
                await this.transactionRepository.UpdateAsync(firstTransaction);

                transfer.SetRate(arg.Rate.Value);
                await transactionRepository.UpdateTransferAsync(transfer);
            }
            //just edit 1 transaction, no transfer before
            else if (arg.ExtendedType != Common.Enums.ExtendedTransactionType.Transfer
                && transfer == null && secondTransaction == null)
            {
                decimal amount = 0;

                if (arg.Type == TransactionType.Expense && arg.Amount > 0)
                {
                    amount = arg.Amount * (-1);
                }
                else if (arg.Type == TransactionType.Income && arg.Amount < 0)
                {
                    amount = arg.Amount * (-1);
                }
                else
                {
                    amount = arg.Amount;
                }

                firstTransaction.Edit(arg.AccountId, arg.Type, amount, arg.Date, arg.Name, arg.Comment, arg.CategoryId);
                await this.transactionRepository.UpdateAsync(firstTransaction);
            }
        }

        public async Task RemoveTransactionAsync(int transactionId)
        {
            var firstTransaction = await this.transactionRepository.GetTransactionAsync(transactionId);
            Transaction secondTransaction = null;
            var transfer = await this.transactionRepository.GetTransferAsync(transactionId);

            if (transfer != null)
            {
                var secondTRansactionId = transfer.ToTransactionId != transactionId ? transfer.ToTransactionId : transfer.FromTransactionId;
                secondTransaction = await this.transactionRepository.GetTransactionAsync(secondTRansactionId);
                await transactionRepository.RemoveTransferAsync(transfer);
                await transactionRepository.RemoveTransactionAsync(secondTransaction);
            }
            await transactionRepository.RemoveTransactionAsync(firstTransaction);
        }

        public async Task AddTransferAsync(AddTransferDTO arg)
        {

            var transactionExpense = Transaction.Create(arg.AccountId, TransactionType.Income, arg.Amount, arg.Date, arg.Name, arg.Comment, arg.CategoryId);
            await transactionRepository.AddTransactionAsync(transactionExpense);

            var transactionIncome = Transaction.Create(arg.TransferAccountId, TransactionType.Income, arg.TransferAmount, arg.TransferDate, arg.Name, arg.Comment, arg.CategoryId);
            await transactionRepository.AddTransactionAsync(transactionIncome);

            var transfer = Transfer.Create(transactionExpense.Id, transactionIncome.Id, arg.Rate);
            await transactionRepository.AddTransferAsync(transfer);

        }

        public async Task<EditTransactionDTO> GetEditTransactionAsync(int id)
        {
            var t = await this.transactionRepository.GetTransactionAsync(id);

            var transaction = new EditTransactionDTO
            {
                AccountId = t.AccountId,
                Amount = t.Amount,
                CategoryId = t.CategoryId,
                Comment = t.Comment,
                Date = t.Date,
                Id = t.Id,
                Name = t.Name,
                Type = t.Type,
            };

            transaction.ExtendedType = transaction.Type == TransactionType.Income ? ExtendedTransactionType.Income : ExtendedTransactionType.Expense;

            var transfer = await this.transactionRepository.GetTransferAsync(transaction.Id);

            if (transfer != null)
            {
                int transferedTransactionId;
                if (transaction.Id == transfer.FromTransactionId)
                {
                    transferedTransactionId = transfer.ToTransactionId;
                }
                else
                {
                    transferedTransactionId = transfer.FromTransactionId;
                }
                var transferedTransaction = await this.transactionRepository.GetTransactionAsync(transferedTransactionId);

                transaction.Rate = transfer.Rate;
                transaction.TransferId = transfer.Id;

                if (transaction.Id == transfer.FromTransactionId)
                {
                    transaction.TransferAmount = transferedTransaction.Amount;
                    transaction.TransferDate = transferedTransaction.Date;
                    transaction.TransferTransactionId = transferedTransaction.Id;
                    transaction.TransferAccountId = transferedTransaction.AccountId;

                }
                else
                {
                    transaction.TransferAmount = transaction.Amount;
                    transaction.Amount = transferedTransaction.Amount;

                    transaction.TransferDate = transaction.Date;
                    transaction.Date = transferedTransaction.Date;

                    transaction.TransferTransactionId = transaction.Id;
                    transaction.Id = transferedTransaction.Id;


                    transaction.TransferAccountId = transaction.AccountId;
                    transaction.AccountId = transferedTransaction.AccountId;
                }

                transaction.ExtendedType = ExtendedTransactionType.Transfer;

            }

            return transaction;
        }
    }
}
