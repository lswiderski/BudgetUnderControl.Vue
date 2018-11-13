﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BudgetUnderControl.Domain
{
    public interface IContextFacade
    {
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
        EntityEntry Remove(object entity);
        EntityEntry<TEntity> Remove<TEntity>(TEntity entity) where TEntity : class;
        void RemoveRange(IEnumerable<object> entities);

        DbSet<Account> Accounts { get; set; }
        DbSet<AccountGroup> AccountGroup { get; set; }
        DbSet<AccountSnapshot> AccountSnapshot { get; set; }
        DbSet<Category> Categories { get; set; }
        DbSet<Currency> Currencies { get; set; }
        DbSet<ExchangeRate> ExchangeRates { get; set; }
        DbSet<File> Files { get; set; }
        DbSet<Icon> Icons { get; set; }
        DbSet<Tag> Tags { get; set; }
        DbSet<TagToTransaction> TagsToTransactions { get; set; }
        DbSet<Transaction> Transactions { get; set; }
        DbSet<Transfer> Transfers { get; set; }
        DbSet<User> Users { get; set; }
    }
}