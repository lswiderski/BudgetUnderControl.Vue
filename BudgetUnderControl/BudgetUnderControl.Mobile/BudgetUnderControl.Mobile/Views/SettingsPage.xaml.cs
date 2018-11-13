﻿using Autofac;
using BudgetUnderControl.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace BudgetUnderControl.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SettingsPage : ContentPage
    {
        ISettingsViewModel vm;
        public SettingsPage()
        {
            using (var scope = App.Container.BeginLifetimeScope())
            {
                this.BindingContext = vm = scope.Resolve<ISettingsViewModel>();
            }

            InitializeComponent();
        }

        private async void ExportButton_Clicked(object sender, EventArgs e)
        {
            await vm.ExportBackupAsync();
        }

        private async void ImportButton_Clicked(object sender, EventArgs e)
        {
            await vm.ImportBackupAsync();
        }

        private async void ExportCSVButton_Clicked(object sender, EventArgs e)
        {
            await vm.ExportCSVAsync();
        }

        private async void ExportSQLDBButton_Clicked(object sender, EventArgs e)
        {
            await vm.ExportDBAsync();
        }
    }
}