﻿using Autofac;
using BudgetUnderControl.Domain.Repositiories;
using BudgetUnderControl.Infrastructure;
using BudgetUnderControl.Infrastructure.Services;
using BudgetUnderControl.Mobile.Views;
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
    public partial class Currencies : ContentPage
    {
        ICurrencyService currencyService;
        public Currencies()
        {
            InitializeComponent();

            using (var scope = App.Container.BeginLifetimeScope())
            {
                this.currencyService = scope.Resolve<ICurrencyService>();
            }
               
        }

        async void OnButtonClicked(object sender, EventArgs e)
        {
            var model = await currencyService.GetCurriencesAsync();

            curriences.ItemsSource =  model;
        }

        protected override async void OnAppearing()
        {
            var model = await currencyService.GetCurriencesAsync();

            curriences.ItemsSource =  model;
        }

        private void OnExchangeRatesButtonClicked(object sender, EventArgs e)
        {
            App.MasterPage.NavigateTo(typeof(ExchangeRates));
        }
    }
}