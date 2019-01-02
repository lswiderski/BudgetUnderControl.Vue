﻿using Autofac;
using BudgetUnderControl.Mobile.Markers;
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
    public partial class AddTransaction : ContentPage, ITagSelectablePage
    {
        IAddTransactionViewModel vm;
        public AddTransaction()
        {
            using (var scope = App.Container.BeginLifetimeScope())
            {
                this.BindingContext = vm = scope.Resolve<IAddTransactionViewModel>();
            }
            InitializeComponent();
            
            amount.Completed += (object sender, EventArgs e) => { name.Focus(); };
            name.Completed += (object sender, EventArgs e) => { type.Focus(); };
            type.Unfocused += (object sender, FocusEventArgs e) => { account.Focus(); };
            account.Unfocused += (object sender, FocusEventArgs e) => { categories.Focus(); };
        }

        public AddTransaction(string amount, string title) : this()
        {
            vm.Amount = amount;
            vm.Name = title;
        }

        async void OnAddButtonClicked(object sender, EventArgs args)
        {
            await vm.AddTransacionAsync();
            await Navigation.PopModalAsync();
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            amount.Focus();
        }

        async void OnSelectTagsButtonClicked(object sender, EventArgs args)
        {
            var selectTags = new SelectTags(this);
            await Navigation.PushModalAsync(selectTags);
        }

        async void OnDeleteTagButtonClicked(object sender, SelectedItemChangedEventArgs e)
        {
            Guid tagId = vm.SelectedTag.ExternalId;
            await vm.RemoveTagFromListAsync(tagId);
        }

        public async void AddTagToList(Guid tagId)
        {
            await vm.AddTagAsync(tagId);
        }

    }
}