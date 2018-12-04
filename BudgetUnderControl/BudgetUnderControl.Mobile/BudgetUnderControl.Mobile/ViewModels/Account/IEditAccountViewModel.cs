﻿using BudgetUnderControl.Common.Contracts;
using BudgetUnderControl.Infrastructure;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace BudgetUnderControl.ViewModel
{
    public interface IEditAccountViewModel
    {
        string Name { get; set; }
        string Comment { get; set; }
        bool IsInTotal { get; set; }
        bool IsActive { get; set; }
        string Amount { get; set; }
        string Order { get; set; }
        int SelectedCurrencyIndex { get; set; }
        int SelectedAccountGroupIndex { get; set; }
        int SelectedAccountIndex { get; set; }
        int SelectedAccountTypeIndex { get; set; }
        List<AccountGroupItemDTO> AccountGroups { get;}
        List<CurrencyDTO> Currencies { get;}
        List<AccountListItemDTO> Accounts { get; }
        List<AccountTypeDTO> AccountTypes { get; }

        void LoadAccount(Guid accountId);
        Task SaveAccount();
        void ClearParentAccountCombo();
    }
}
