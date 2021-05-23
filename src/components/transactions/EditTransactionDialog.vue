<template>
  <div>
    <Dialog
      v-model:visible="transactionDialog"
      :style="{ width: '1000px' }"
      header="transaction Details"
      :modal="true"
      class="p-fluid"
    >
      <TabView>
        <TabPanel header="General">
          <div class="p-fluid p-formgrid p-grid">
            <div class="p-col-6">
              <div class="p-grid">
                <div class="p-field p-col-12 p-md-12">
                  <label for="type">Type</label>
                  <SelectButton
                    id="type"
                    v-model="transaction.type"
                    :options="types"
                    optionLabel="text"
                    optionValue="value"
                    :class="{ 'p-invalid': submitted && !transaction.type }"
                  />
                  <small class="p-error" v-if="submitted && !transaction.type"
                    >Type is required.</small
                  >
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="amount">Value</label>
                  <InputText
                    id="amount"
                    v-model.trim="transaction.amount"
                    required="true"
                    autofocus
                    :class="{ 'p-invalid': submitted && !transaction.amount }"
                  />
                  <small class="p-error" v-if="submitted && !transaction.amount"
                    >Value is required.</small
                  >
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="name">Name</label>
                  <InputText
                    id="name"
                    v-model.trim="transaction.name"
                    required="true"
                    autofocus
                    :class="{ 'p-invalid': submitted && !transaction.name }"
                  />
                  <small class="p-error" v-if="submitted && !transaction.name"
                    >Name is required.</small
                  >
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="account">Account</label>
                  <Dropdown
                    id="account"
                    v-model="transaction.accountId"
                    :options="accounts"
                    optionLabel="name"
                    optionValue="id"
                    :class="{
                      'p-invalid': submitted && !transaction.accountId,
                    }"
                  />
                  <small
                    class="p-error"
                    v-if="submitted && !transaction.accountId"
                    >Account is required.</small
                  >
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="category">Category</label>
                  <Dropdown
                    id="category"
                    v-model="transaction.categoryId"
                    :options="categories"
                    optionLabel="name"
                    optionValue="id"
                    :class="{
                      'p-invalid': submitted && !transaction.categoryId,
                    }"
                  />
                  <small
                    class="p-error"
                    v-if="submitted && !transaction.categoryId"
                    >Account is required.</small
                  >
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="date">Date</label>
                  <Calendar
                    v-model="transaction.date"
                    :showIcon="true"
                    id="date"
                    :yearNavigator="true"
                    :monthNavigator="true"
                    yearRange="2000:2030"
                    :showTime="true"
                  />
                  <small class="p-error" v-if="submitted && !transaction.date"
                    >Date is required.</small
                  >
                </div>
                <div
                  class="p-col-12 p-md-12 p-grid"
                  v-if="transaction.type === 2"
                >
                  <div class="p-field p-col-12 p-md-6">
                    <label for="transferDate">Transfer Date</label>
                    <Calendar
                      v-model="transaction.transferDate"
                      :showIcon="true"
                      id="transferDate"
                      :yearNavigator="true"
                      :monthNavigator="true"
                      yearRange="2000:2030"
                      :showTime="true"
                    />
                    <small
                      class="p-error"
                      v-if="submitted && !transaction.transferDate"
                      >Transfer is required.</small
                    >
                  </div>
                  <div class="p-field p-col-12 p-md-6">
                    <label for="transferAccount">Transfer Account</label>
                    <Dropdown
                      id="transferAccount"
                      v-model="transaction.transferAccountId"
                      :options="accounts"
                      optionLabel="name"
                      optionValue="id"
                      :class="{
                        'p-invalid':
                          submitted && !transaction.transferAccountId,
                      }"
                    />
                    <small
                      class="p-error"
                      v-if="submitted && !transaction.transferAccountId"
                      >Account is required.</small
                    >
                  </div>
                  <div class="p-field p-col-12 p-md-6">
                    <label for="transferAmount">Transfer Amount</label>
                    <InputText
                      id="transferAmount"
                      v-model.trim="transaction.transferAmount"
                      required="true"
                      autofocus
                      :class="{
                        'p-invalid': submitted && !transaction.transferAmount,
                      }"
                    />
                    <small
                      class="p-error"
                      v-if="submitted && !transaction.transferAmount"
                      >Value is required.</small
                    >
                  </div>
                  <div
                    class="p-field p-col-12 p-md-6"
                    v-if="transaction.type === 2 && isTransferInOtherCurrency"
                  >
                    <label for="rate">Exchange Rate</label>
                    <InputText
                      id="rate"
                      v-model.trim="transaction.rate"
                      required="true"
                      autofocus
                      :class="{ 'p-invalid': submitted && !transaction.rate }"
                    />
                    <small class="p-error" v-if="submitted && !transaction.rate"
                      >rate is required.</small
                    >
                  </div>
                </div>
                <div class="p-field p-col-12 p-md-12">
                  <label for="tags">Tags</label>
                  <MultiSelect
                    v-model="transaction.tags"
                    :options="tags"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="multiple selects"
                    id="tags"
                    display="chip"
                  />
                </div>
              </div>
            </div>
            <div class="p-col-6">
              <div class="p-grid">
                <div class="p-field p-col-12 p-md-6">
                  <label for="latitude">latitude</label>
                  <InputText
                    id="latitude"
                    v-model.trim="transaction.latitude"
                    autofocus
                  />
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="longitude">longitude</label>
                  <InputText
                    id="longitude"
                    v-model.trim="transaction.longitude"
                    autofocus
                  />
                </div>
                <div class="p-field p-col-12 p-md-12">
                  <label for="comment">Map</label>
<OnePointMap
                        :latitude="transaction.latitude"
                        :longitude="transaction.longitude"
                        :centerLatitude="centerLatitude"
                        :centerLongitude="centerLongitude"
                        v-on:coordsChanged="onMapClick"
                        ref="transacionMap"
                      />
                </div>
                <div class="p-field p-col-12 p-md-12">
                  <label for="comment">Comment</label>
                  <Textarea
                    v-model="transaction.comment"
                    :autoResize="true"
                    rows="5"
                    cols="30"
                    id="comment"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Files">  </TabPanel>
      </TabView>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveTransaction"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { authHeader } from "../../_helpers";
import { handleResponse } from "../../_helpers";
import { catchError } from "../../_helpers";
import axios from "axios";
import { transactionsService } from "../../services";
import OnePointMap from "../maps/OnePointMap";

export default {
  name: "EditTransactionDialog",
    components: {
    OnePointMap
  },
  data() {
    return {
      transactionDialog: false,
      transaction: {},
      submitted: false,
      errors: [],
      accounts: [],
      categories: [],
      isExist: false,
       defaultItem: {
      name: "",
      accountId: 3,
      categoryId: 0,
      amount: 0,
      date: new Date(Date.now()),
      comment: "",
      type: 1,
      transferAccountId: null,
      transferDate: new Date(Date.now()),
      transferAmount: 0,
      rate: 1,
      tags: null,
      latitude: null,
      longitude: null
    },
      types: [
        {
          text: "Income",
          value: 0,
        },
        {
          text: "Expense",
          value: 1,
        },
        {
          text: "Transfer",
          value: 2,
        },
      ],
    };
  },
  computed: {
    centerLatitude() {
      return this.transaction.latitude ?? 52.183411;
    },
    centerLongitude() {
      return this.transaction.longitude ?? 21.01855;
    },
    tags() {
      return this.$store.state.tags.tags.items;
    },
    isTransferInOtherCurrency() {
      let accountIndex = this.getAccountIndex(this.transaction.accountId);
      let transferAccountIndex = this.getAccountIndex(
        this.transaction.transferAccountId
      );
      return (
        transferAccountIndex > -1 &&
        this.accounts[accountIndex].currencyId !=
          this.accounts[transferAccountIndex].currencyId
      );
    },
  },
  methods: {
    hideDialog() {
      this.transactionDialog = false;
      this.submitted = false;
    },
    mapAPItoEdit(data) {
      let dto = { ...data };
      dto.type = dto.extendedType;
      dto.amount = Math.abs(dto.amount);
      if (dto.transferAmount != null) {
        dto.transferAmount = Math.abs(dto.transferAmount);
      }

      dto.time =
        new Date(dto.date).getHours() + ":" + new Date(dto.date).getMinutes();
      dto.date = new Date(dto.date);
      dto.transferDate = new Date(dto.transferDate);
      return dto;
    },
    mapEditToAPI(data) {
      let dto = { ...data };
      dto.extendedType = data.type;
      if (dto.amount > 0) {
        dto.amount *= -1;
      }
      dto.transferAmount = +dto.transferAmount;
      if (dto.transferAmount < 0) {
        dto.transferAmount *= -1;
      }
      return dto;
    },

        onMapClick(value) {
      this.transaction.latitude = value.lat;
      this.transaction.longitude = value.lng;
    },

    openEmptyDialog() {
      this.transaction = {... this.defaultItem };
      this.errors = [];
      this.transactionDialog = true;
    //  this.hasImage = this.editedItem.fileGuid !== null && this.editedItem.fileGuid !== undefined;
      setTimeout(() => {
        this.$refs.transacionMap.invalideSize();
      }, 100);
    },

    openDialog(item) {
      const _self = this;
       this.isExist = item !== null;
      transactionsService
        .get(item.externalId)
        .then((data) => {
          const dto = _self.mapAPItoEdit(data);
          _self.transaction = { ...dto }; //Object.assign({}, dto);
          _self.transactionDialog = true;
           setTimeout(() => {
        this.$refs.transacionMap.invalideSize();
      }, 100);
        })
        .catch((errors) => {
          _self.errors = errors;
        });
    },
    saveTransaction() {
      this.submitted = true;
      const _self = this;
      let dto = _self.mapEditToAPI(this.transaction);
      if (this.isExist) {
        transactionsService
          .edit(this.transaction.externalId, dto)
          .then(() => {
            this.$store.dispatch(
              "transactions/getAll",
              this.$store.state.transactionFilters
            );
            this.hideDialog();
          })
          .catch((data) => {
            _self.errors = data;
          });
      } else {
        transactionsService
          .add(dto)
          .then(() => {
            this.$store.dispatch(
              "transactions/getAll",
              this.$store.state.transactionFilters
            );
            this.hideDialog();
          })
          .catch((errors) => {
            _self.errors = errors;
          });
      }
    },
    getAccountIndex(accountId) {
      for (let i = 0; i < this.accounts.length; i++) {
        if (this.accounts[i].id == accountId) {
          return i;
        }
      }

      return -1;
    },
  },
  mounted() {
    const _self = this;
    axios
      .get(`/categories`, { params: {}, headers: authHeader() })
      .then(handleResponse)
      .then((data) => {
        _self.categories = data;
      })
      .catch(catchError);

    axios
      .get(`/accounts`, { params: {}, headers: authHeader() })
      .then(handleResponse)
      .then((data) => {
        _self.accounts = data;
      })
      .catch(catchError);
  },
};
</script>