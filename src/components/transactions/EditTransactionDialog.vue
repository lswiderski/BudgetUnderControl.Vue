<template>
  <div>
    <Dialog
      v-model:visible="transactionDialog"
      :style="{ width: '1000px' }"
      header="transaction Details"
      :modal="true"
      class="p-fluid"
    >
      <TabView class="p-mt-1">
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
                    :class="{
                      'p-invalid':
                        (submitted && v$.transaction.type.$invalid) ||
                        errors.type,
                    }"
                  />
                  <small
                    class="p-error"
                    v-if="submitted && v$.transaction.type.$invalid"
                    >{{
                      v$.transaction.type.required.$message.replace(
                        "Value",
                        "Type"
                      )
                    }}</small
                  >
                  <small class="p-error" v-else-if="errors.type">
                    {{ errors.type }}</small
                  >
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="amount">Amount</label>
                  <InputNumber
                    :minFractionDigits="1"
                    mode="decimal"
                    id="amount"
                    v-model="transaction.amount"
                    required="true"
                    autofocus
                    :class="{
                      'p-invalid':
                        (submitted && v$.transaction.amount.$invalid) ||
                        errors.amount,
                    }"
                  />
                  <small
                    class="p-error"
                    v-if="submitted && v$.transaction.amount.$invalid"
                    >{{
                      v$.transaction.amount.required.$message.replace(
                        "Value",
                        "Amount"
                      )
                    }}</small
                  >
                  <small class="p-error" v-else-if="errors.amount">
                    {{ errors.amount }}</small
                  >
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="name">Name</label>
                  <InputText
                    id="name"
                    v-model.trim="transaction.name"
                    required="true"
                    autofocus
                    :class="{
                      'p-invalid':
                        (submitted && v$.transaction.name.$invalid) ||
                        errors.name,
                    }"
                  />
                  <small
                    class="p-error"
                    v-if="submitted && v$.transaction.name.$invalid"
                    >{{
                      v$.transaction.name.required.$message.replace(
                        "Value",
                        "Name"
                      )
                    }}</small
                  >
                  <small class="p-error" v-else-if="errors.name">
                    {{ errors.name }}</small
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
                      'p-invalid':
                        (submitted && v$.transaction.accountId.$invalid) ||
                        errors.accountId,
                    }"
                  />
                  <small
                    class="p-error"
                    v-if="submitted && v$.transaction.accountId.$invalid"
                    >{{
                      v$.transaction.accountId.required.$message.replace(
                        "Value",
                        "Account"
                      )
                    }}</small
                  >
                  <small class="p-error" v-else-if="errors.accountid">
                    {{ errors.accountid }}</small
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
                      'p-invalid':
                        (submitted && v$.transaction.categoryId.$invalid) ||
                        errors.categoryId,
                    }"
                  />
                  <small
                    class="p-error"
                    v-if="submitted && v$.transaction.categoryId.$invalid"
                    >{{
                      v$.transaction.categoryId.required.$message.replace(
                        "Value",
                        "Category"
                      )
                    }}</small
                  >
                  <small class="p-error" v-else-if="errors.categoryid">
                    {{ errors.categoryid }}</small
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
                    :class="{
                      'p-invalid':
                        (submitted && v$.transaction.date.$invalid) ||
                        errors.date,
                    }"
                  />
                  <small
                    class="p-error"
                    v-if="submitted && v$.transaction.date.$invalid"
                    >{{
                      v$.transaction.date.required.$message.replace(
                        "Value",
                        "Date"
                      )
                    }}</small
                  >
                  <small class="p-error" v-else-if="errors.date">
                    {{ errors.date }}</small
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
                      :class="{
                        'p-invalid':
                          (submitted && v$.transaction.transferDate.$invalid) ||
                          errors.transferdate,
                      }"
                    />
                    <small
                      class="p-error"
                      v-if="submitted && v$.transaction.transferDate.$invalid"
                      >{{
                        v$.transaction.transferDate.required.$message.replace(
                          "Value",
                          "Transfer Account"
                        )
                      }}</small
                    >
                    <small class="p-error" v-else-if="errors.transferdate">
                      {{ errors.transferdate }}</small
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
                          (submitted &&
                            v$.transaction.transferAccountId.$invalid) ||
                          errors.transferaccountid,
                      }"
                    />
                    <small
                      class="p-error"
                      v-if="
                        submitted && v$.transaction.transferAccountId.$invalid
                      "
                      >{{
                        v$.transaction.transferAccountId.required.$message.replace(
                          "Value",
                          "Transfer Account"
                        )
                      }}</small
                    >
                    <small class="p-error" v-else-if="errors.transferaccountid">
                      {{ errors.transferaccountid }}</small
                    >
                  </div>
                  <div class="p-field p-col-12 p-md-6">
                    <label for="transferAmount">Transfer Amount</label>
                    <InputNumber
                      :minFractionDigits="1"
                      mode="decimal"
                      id="transferAmount"
                      v-model="transaction.transferAmount"
                      required="true"
                      autofocus
                      :class="{
                        'p-invalid':
                          (submitted &&
                            v$.transaction.transferAmount.$invalid) ||
                          errors.transferamount,
                      }"
                    />
                    <small
                      class="p-error"
                      v-if="submitted && v$.transaction.transferAmount.$invalid"
                      >{{
                        v$.transaction.transferAmount.required.$message.replace(
                          "Value",
                          "Transfer Amount"
                        )
                      }}</small
                    >
                    <small class="p-error" v-else-if="errors.transferamount">
                      {{ errors.transferamount }}</small
                    >
                  </div>
                  <div
                    class="p-field p-col-12 p-md-6"
                    v-if="transaction.type === 2 && isTransferInOtherCurrency"
                  >
                    <label for="rate">Exchange Rate</label>
                    <InputNumber
                      :minFractionDigits="1"
                      :maxFractionDigits="12"
                      id="rate"
                      v-model="transaction.rate"
                      required="true"
                      autofocus
                      :class="{
                        'p-invalid':
                          (submitted && v$.transaction.rate.$invalid) ||
                          errors.rate,
                      }"
                    />
                    <small
                      class="p-error"
                      v-if="submitted && v$.transaction.rate.$invalid"
                      >{{
                        v$.transaction.rate.required.$message.replace(
                          "Value",
                          "Rate"
                        )
                      }}</small
                    >
                    <small class="p-error" v-else-if="errors.rate">
                      {{ errors.rate }}</small
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
                  <InputNumber
                    :minFractionDigits="4"
                    :maxFractionDigits="8"
                    mode="decimal"
                    id="latitude"
                    v-model="transaction.latitude"
                    autofocus
                    :class="{
                      'p-invalid':
                        (submitted && v$.transaction.latitude.$invalid) ||
                        errors.latitude,
                    }"
                  />
                  <small
                    class="p-error"
                    v-if="submitted && v$.transaction.latitude.$invalid"
                    >{{
                      v$.transaction.latitude.required.$message.replace(
                        "Value",
                        "Latitude"
                      )
                    }}</small
                  >
                  <small class="p-error" v-else-if="errors.latitude">
                    {{ errors.latitude }}</small
                  >
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="longitude">longitude</label>
                  <InputNumber
                    :minFractionDigits="4"
                    :maxFractionDigits="8"
                    mode="decimal"
                    id="longitude"
                    v-model="transaction.longitude"
                    autofocus
                    :class="{
                      'p-invalid':
                        (submitted && v$.transaction.longitude.$invalid) ||
                        errors.longitude,
                    }"
                  />
                  <small
                    class="p-error"
                    v-if="submitted && v$.transaction.longitude.$invalid"
                    >{{
                      v$.transaction.longitude.required.$message.replace(
                        "Value",
                        "Longitude"
                      )
                    }}</small
                  >
                  <small class="p-error" v-else-if="errors.longitude">
                    {{ errors.longitude }}</small
                  >
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
                    :class="{
                      'p-invalid':
                        (submitted && v$.transaction.comment.$invalid) ||
                        errors.comment,
                    }"
                  />
                  <small
                    class="p-error"
                    v-if="submitted && v$.transaction.comment.$invalid"
                    >{{
                      v$.transaction.comment.required.$message.replace(
                        "Value",
                        "comment"
                      )
                    }}</small
                  >
                  <small class="p-error" v-else-if="errors.comment">
                    {{ errors.comment }}</small
                  >
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Files">
          <div>
            <div class="p-field">
               <FileUpload
              v-if="!hasImage"
              name="files"
              accept="image/*"
              mode="basic"
              :customUpload="true"
              @uploader="imageUploader"
            />
            <Button
              v-if="hasImage"
              label="Remove File"
              icon="pi pi-times"
              class="p-button-text"
              @click="removeFile"
            />
            </div>
           
            <div class="p-field">
              <img v-if="hasImage" :src="imageUrl" class="transaction-attachment-image" />
            </div>
          </div>
        </TabPanel>
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
          @click="saveTransaction()"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { authHeader, handleResponse, catchErrors } from "../../_helpers";
import Configuration from "../../_helpers/configuration";
import axios from "axios";
import { transactionsService, filesService } from "../../services";
import OnePointMap from "../maps/OnePointMap";
import useVuelidate from "@vuelidate/core";
import {
  required,
  requiredIf,
  numeric,
  maxLength,
} from "@vuelidate/validators";

export default {
  name: "EditTransactionDialog",
  components: {
    OnePointMap,
  },
  setup() {
    return { v$: useVuelidate() };
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
      hasImage: false,
      defaultItem: {
        name: "",
        accountId: null,
        categoryId: null,
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
        longitude: null,
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
  validations() {
    return {
      transaction: {
        amount: { required },
        type: { required },
        name: { required, maxLength: maxLength(100) },
        categoryId: { required },
        accountId: { required },
        date: { required },
        latitude: { numeric },
        longitude: { numeric },
        comment: { maxLength: maxLength(1000) },

        transferAmount: {
          required: requiredIf(() => this.transaction.type === 2),
        },
        transferDate: {
          required: requiredIf(() => this.transaction.type === 2),
        },
        transferAccountId: {
          required: requiredIf(() => this.transaction.type === 2),
        },
        rate: {
          required: requiredIf(
            () => this.transaction.type === 2 && this.isTransferInOtherCurrency
          ),
        },
      },
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
    imageUrl() {
      return `${Configuration.value("backendHost")}/files/${
        this.transaction.fileGuid
      }?token=SECUREDTOKEN`;
    },
  },
  methods: {
    hideDialog() {
      this.transactionDialog = false;
      this.submitted = false;
      this.hasImage = false;
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
      this.transaction = { ...this.defaultItem };
      this.errors = [];
      this.transactionDialog = true;
      if (this.accounts.length > 0) {
        this.transaction.accountId = this.accounts[0].id;
      }
      if (this.categories.length > 0) {
        this.transaction.categoryId = this.categories[0].id;
      }

      this.hasImage =
        this.transaction.fileGuid !== null &&
        this.transaction.fileGuid !== undefined;
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
          _self.transaction = { ...dto };
          _self.transactionDialog = true;
          _self.hasImage =
            _self.transaction.fileGuid !== null &&
            _self.transaction.fileGuid !== undefined;
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

      if (this.v$.transaction.$invalid) {
        return;
      }

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
        transactionsService.add(dto).then(
          () => {
            this.$store.dispatch(
              "transactions/getAll",
              this.$store.state.transactionFilters
            );
            this.hideDialog();
          },
          (errors) => {
            _self.errors = errors;
          }
        );
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
    imageUploader(event) {
      const _self = this;
      filesService
        .add(event.files[0])
        .then((result) => {
          _self.hasImage = true;
          _self.transaction.fileGuid = result;
        })
        .catch(catchErrors);
    },
    removeFile() {
      const _self = this;
      filesService
        .remove(this.transaction.fileGuid)
        .then(() => {
          _self.hasImage = false;
          _self.transaction.fileGuid = null;
        })
        .catch(catchErrors);
    },
  },
  watch: {
    "transaction.transferAmount": function () {
      if (
        this.transaction.amount &&
        this.transaction.transferAmount &&
        this.transaction.transferAmount != 0
      ) {
        this.transaction.rate =
          this.transaction.amount / this.transaction.transferAmount;
      }
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
      .catch(catchErrors);

    axios
      .get(`/accounts`, { params: {}, headers: authHeader() })
      .then(handleResponse)
      .then((data) => {
        _self.accounts = data;
      })
      .catch(catchErrors);
  },
};
</script>
<style scoped>
.transaction-attachment-image{
  width:100%;
}
</style>