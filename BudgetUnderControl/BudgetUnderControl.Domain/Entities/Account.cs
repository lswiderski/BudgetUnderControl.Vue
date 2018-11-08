﻿using BudgetUnderControl.Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetUnderControl.Domain
{
    public class Account
    {
        [Key]
        public int Id { get; protected set; }
        [StringLength(250)]
        public string Name { get; protected set; }
        public int CurrencyId { get; protected set; }
        public int AccountGroupId { get; protected set; }
        public bool IsIncludedToTotal { get; protected set; }
        public string Comment { get; protected set; }
        public int Order { get; protected set; }
        public AccountType Type { get; protected set; }
        public int? ParentAccountId { get; protected set; }
        public bool IsActive { get; protected set; }

        public AccountGroup AccountGroup { get; protected set; }
        public Currency Currency { get;  set; }
        public List<AccountSnapshot> AccountSnapshots { get; protected set; }
        public List<Transaction> Transactions { get; protected set; }

       
        protected Account()
        {

        }

        public static Account Create(string name, int currencyId, int accountGroupId,
            bool isIncludedToTotal, string comment, int order, AccountType type, 
            int? parentAccountId, bool isActive)
        {
            return new Account()
            {
                Name = name,
                CurrencyId = currencyId,
                AccountGroupId = accountGroupId,
                IsActive = isActive,
                IsIncludedToTotal = isIncludedToTotal,
                Comment = comment,
                Order = order,
                Type = type,
                ParentAccountId = parentAccountId
            };
        }

        public void Edit(string name, int currencyId, int accountGroupId,
            bool isIncludedToTotal, string comment, int order, AccountType type,
            int? parentAccountId, bool isActive)
        {
            this.Name = name;
            this.CurrencyId = currencyId;
            this.AccountGroupId = accountGroupId;
            this.IsActive = isActive;
            this.IsIncludedToTotal = isIncludedToTotal;
            this.Comment = comment;
            this.Order = order;
            this.Type = type;
            this.ParentAccountId = parentAccountId;
        }

        /// <summary>
        /// Use for sync/imports
        /// </summary>
        /// <param name="id"></param>
        public void SetId(int id)
        {
            this.Id = id;
        }

        /// <summary>
        /// Use for sync/imports
        /// </summary>
        /// <param name="id"></param>
        public void SetActive(bool isActive)
        {
            this.IsActive = IsActive;
        }
    }
}
