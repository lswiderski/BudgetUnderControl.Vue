<template>
  <div class="p-mt-1">
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-col-12 p-md-8">
        <div class="p-grid">
          <div class="p-field p-col-12 p-md-3">
            <label for="name">Name</label>
            <div>
              <InputText
                id="name"
                v-model="account.name"
                required="true"
                :class="{
                  'p-invalid':
                    (submitted && v$.account.name.$invalid) || errors.name,
                }"
              />
              <small
                class="p-error"
                v-if="submitted && v$.account.name.$invalid"
                >{{
                  v$.account.name.required.$message.replace("Value", "Name")
                }}</small
              >
              <small class="p-error" v-else-if="errors.name">
                {{ errors.name }}</small
              >
            </div>
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="amount">Amount</label>
            <InputNumber
              :minFractionDigits="1"
              mode="decimal"
              id="amount"
              v-model="account.amount"
              required="true"
              :class="{
                'p-invalid':
                  (submitted && v$.account.amount.$invalid) || errors.amount,
              }"
            />
            <small
              class="p-error"
              v-if="submitted && v$.account.amount.$invalid"
              >{{
                v$.account.amount.required.$message.replace("Value", "Amount")
              }}</small
            >
            <small class="p-error" v-else-if="errors.amount">
              {{ errors.amount }}</small
            >
          </div>

          <div class="p-field p-col-12 p-md-3">
            <label for="currency">Currency</label>
            <Dropdown
              id="currency"
              v-model="account.currencyId"
              :options="currencies"
              optionLabel="name"
              optionValue="id"
              :class="{
                'p-invalid':
                  (submitted && v$.account.currencyId.$invalid) ||
                  errors.currencyid,
              }"
            />
            <small
              class="p-error"
              v-if="submitted && v$.account.currencyId.$invalid"
              >{{
                v$.account.currencyId.required.$message.replace(
                  "Value",
                  "Currency"
                )
              }}</small
            >
            <small class="p-error" v-else-if="errors.currencyid">
              {{ errors.currencyid }}</small
            >
          </div>
          <div class="p-field p-col-12 p-md-2">
            <label for="order">Order</label>
            <InputNumber
              :minFractionDigits="0"
              :showButtons="true"
              mode="decimal"
              id="order"
              v-model="account.order"
              required="true"
              autofocus
              :class="{
                'p-invalid':
                  (submitted && v$.account.order.$invalid) || errors.amount,
              }"
            />
            <small
              class="p-error"
              v-if="submitted && v$.account.order.$invalid"
              >{{
                v$.account.order.required.$message.replace("Value", "order")
              }}</small
            >
            <small class="p-error" v-else-if="errors.order">
              {{ errors.order }}</small
            >
          </div>
        </div>
        <div class="p-grid">
          <div class="p-field p-col-12 p-md-3">
            <label for="group">Group</label>
            <Dropdown
              id="group"
              v-model="account.accountGroupId"
              :options="accountGroups"
              optionLabel="name"
              optionValue="id"
              :class="{
                'p-invalid':
                  (submitted && v$.account.accountGroupId.$invalid) ||
                  errors.accountgroupid,
              }"
            />
            <small
              class="p-error"
              v-if="submitted && v$.account.accountGroupId.$invalid"
              >{{
                v$.account.accountGroupId.required.$message.replace(
                  "Value",
                  "Group"
                )
              }}</small
            >
            <small class="p-error" v-else-if="errors.accountgroupid">
              {{ errors.accountgroupid }}</small
            >
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="type">Type</label>
            <Dropdown
              id="type"
              v-model="account.type"
              :options="accountTypes"
              optionLabel="name"
              optionValue="id"
              :class="{
                'p-invalid':
                  (submitted && v$.account.type.$invalid) || errors.type,
              }"
            />
            <small
              class="p-error"
              v-if="submitted && v$.account.type.$invalid"
              >{{
                v$.account.type.required.$message.replace("Value", "Currency")
              }}</small
            >
            <small class="p-error" v-else-if="errors.type">
              {{ errors.type }}</small
            >
          </div>
          <div class="p-field p-col-12 p-md-3">
            <label for="parent">Parent Account</label>
            <Dropdown
              id="parent"
              v-model="account.parentAccountId"
              :options="accounts.items"
              optionLabel="name"
              optionValue="id"
              :showClear="true"
              :class="{
                'p-invalid':
                  (submitted && v$.account.parentAccountId.$invalid) ||
                  errors.parentaccountid,
              }"
            />
            <small
              class="p-error"
              v-if="submitted && v$.account.parentAccountId.$invalid"
              >{{
                v$.account.parentAccountId.required.$message.replace(
                  "Value",
                  "Parrent account"
                )
              }}</small
            >
            <small class="p-error" v-else-if="errors.parentaccountid">
              {{ errors.parentaccountid }}</small
            >
          </div>
          <div class="p-field p-col-12 p-md-1">
            <div>Active</div>
            <InputSwitch
              id="active"
              v-model="account.isActive"
              :class="{
                'p-invalid':
                  (submitted && v$.account.isActive.$invalid) ||
                  errors.isactive,
              }"
            />
            <small
              class="p-error"
              v-if="submitted && v$.account.isActive.$invalid"
              >{{
                v$.account.isActive.required.$message.replace("Value", "Active")
              }}</small
            >
            <small class="p-error" v-else-if="errors.isactive">
              {{ errors.isactive }}</small
            >
          </div>
          <div class="p-field p-col-12 p-md-2">
            <div>Included in total</div>
            <InputSwitch
              id="includedintotal"
              v-model="account.isIncludedInTotal"
              :class="{
                'p-invalid':
                  (submitted && v$.account.isIncludedInTotal.$invalid) ||
                  errors.isincludedintotal,
              }"
            />
            <small
              class="p-error"
              v-if="submitted && v$.account.isIncludedInTotal.$invalid"
              >{{
                v$.account.isIncludedInTotal.required.$message.replace(
                  "Value",
                  "Included in Total"
                )
              }}</small
            >
            <small class="p-error" v-else-if="errors.isincludedintotal">
              {{ errors.isincludedintotal }}</small
            >
          </div>
        </div>
      </div>
      <div class="p-col-12 p-md-4">
        <div class="p-grid">
          <div class="p-field p-col-12">
            <label for="comment">Comment</label>
            <Textarea
              id="comment"
              v-model="account.comment"
              :autoResize="true"
              rows="5"
              cols="30"
              :class="{
                'p-invalid':
                  (submitted && v$.account.comment.$invalid) || errors.comment,
              }"
            />
            <small
              class="p-error"
              v-if="submitted && v$.account.comment.$invalid"
              >{{
                v$.account.comment.required.$message.replace("Value", "comment")
              }}</small
            >
            <small class="p-error" v-else-if="errors.comment">
              {{ errors.comment }}</small
            >
          </div>
        </div>
      </div>
    </div>

    <div v-if="isExist">
      <Button label="Save" @click="saveAccount($event)" />
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  numeric,
  decimal,
  requiredIf,
  not,
  sameAs,
} from "@vuelidate/validators";
import { accountsService, currenciesService } from "../../services";
export default {
  name: "EditAccountForm",
  props: {
    id: String,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      account: {
        name: { required },
        amount: { required, decimal },
        accountGroupId: { required },
        currencyId: { required },
        type: { required },
        isActive: { required },
        isIncludedInTotal: { required },
        order: { required, numeric },
        parentAccountId: {
          required: requiredIf(() => this.account.type === 2),
          notSameAccount: not(sameAs(this.account.id)),
        },
        comment: {},
      },
    };
  },
  data() {
    return {
      account: {},
      accountGroups: [],
      currencies: [],
      accountTypes: [
        { name: "Account", id: 0 },
        { name: "Wallet", id: 1 },
        { name: "Card", id: 2 },
      ],
      errors: [],
      submitted: false,
      defaultItem: {
        currencyId: 1,
        currency: null,
        accountGroupId: null,
        name: "",
        amount: 0,
        isIncludedInTotal: true,
        isActive: true,
        comment: null,
        type: 1,
        parentAccountId: null,
        order: 1,
      },
    };
  },
  computed: {
    accounts() {
      return this.$store.state.accounts.accounts;
    },
    isExist() {
      return this.id !== undefined;
    },
  },
  mounted() {
    const _self = this;
    this.$store.dispatch("accounts/getAll");
    if (this.isExist) {
      accountsService
        .get(this.id)
        .then((dto) => {
          _self.account = dto;
        })
        .catch((data) => {
          _self.errors = data;
        });
    } else {
      this.account = this.defaultItem;
    }

    currenciesService.getAll().then((array) => {
      _self.currencies = array;
    });

    accountsService.getAllAccountGroups().then((array) => {
      _self.accountGroups = array;
    });
  },
  methods: {
    saveAccount() {
      this.submitted = true;

      if (this.v$.account.$invalid) {
        return;
      }

      const _self = this;
      accountsService
        .edit(this.id, this.account)
        .then(() => {
          this.$store.dispatch(
            "alert/success",
            { title: "Success!", message: "Account saved" },
            { root: true }
          );
        })
        .catch((data) => {
          _self.errors = data;
        });
    },
    saveNewAccount() {
     
      return new Promise((resolve, reject) => {
         this.submitted = true;
      if (this.v$.account.$invalid) {
        return reject();
      }
        const _self = this;
        accountsService
          .add(this.account)
          .then((accountId) => {
            this.$store.dispatch(
              "alert/success",
              { title: "Success!", message: "Account saved" },
              { root: true }
            );
            resolve(accountId);
          })
          .catch((data) => {
            _self.errors = data;
          });
      });
    },
  },
};
</script>
<style scoped>
</style>