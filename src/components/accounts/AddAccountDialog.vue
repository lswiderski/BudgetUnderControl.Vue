<template>
  <div>
    <Dialog
      v-model:visible="addDialog"
      :style="{ width: '1000px' }"
      :modal="true"
      class="p-fluid"
    >
      <template #header>
        <h3>Add Account</h3>
      </template>

      <EditAccountForm ref="editAccountForm" />
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
          @click="saveAccount()"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import EditAccountForm from "./EditAccountForm";
export default {
  name: "AddAccountDialog",
  components: {
    EditAccountForm,
  },
  data() {
    return {
      addDialog: false,
      submitted: false,
      errors: [],
      defaultItem: {},
    };
  },
  methods: {
    hideDialog() {
      this.addDialog = false;
    },
    openEmptyDialog() {
      this.addDialog = true;
    },
    saveAccount() {
      const _self = this;
      this.$refs.editAccountForm
        .saveNewAccount()
        .then(() => {
          this.$store.dispatch("accounts/getAll");
          _self.hideDialog();
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
</style>