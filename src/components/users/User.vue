<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title> User</v-card-title>
    <v-form v-if="editedItem">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="User Name"
              v-model="editedItem.username"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="First Name"
              v-model="editedItem.firstName"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Last Name"
              v-model="editedItem.lastName"
            ></v-text-field>
          </v-col>
          <v-col  cols="12" sm="6" md="3"> 
        <v-select
          v-model="editedItem.role"
          :items="roles"
          :value="editedItem.role"
          label="Role"
        ></v-select>
      </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Email"
              v-model="editedItem.email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="editedItem.activatedOn"
              label="Activated"
              prepend-icon="mdi-calendar"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-checkbox
              v-model="editedItem.isActivated"
              :label="'Activated'"
              disabled
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-btn color="primary" class="mx-2" @click="save"> Save </v-btn>
          <v-btn
            v-if="!editedItem.isActivated"
            color="secondary"
            class="mx-2"
            @click="resetActivationCode"
          > Resend Activation Code</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { usersService } from "../../_services";
import router from "../../_helpers/router";
export default {
  name: "User",
  data() {
    return {
      editedItem: null,
      errors: [],
      defaultItem: {
        username: "",
        firstName: "",
        lastName: "",
        role: 1,
        email: "",
        externalId: null,
        createdAt: null,
        modifiedOn: null,
        isDeleted: false,
        isActivated: true,
        activatedOn: null,
      },
      roles: [
        {
          text:  'User',
          value: 1,
        },
       {
          text:  'LimitedUser',
          value: 2,
        },
        {
          text:  'PremiumUser',
          value: 3,
        },
        {
          text:  'Admin',
          value: 99,
        },
        
        
        
      ]
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    ...mapGetters("users", ["user"]),
  },
  methods: {
    ...mapActions("users", ["get"]),

    save() {
      const _self = this;
      const command = {
        id: this.editedItem.id,
        username: this.editedItem.username,
        firstName: this.editedItem.firstName,
        lastName: this.editedItem.lastName,
        email: this.editedItem.email,
        externalId: this.editedItem.externalId,
        role: this.editedItem.role,
      };

      usersService
        .edit(command.externalId, command)
        .then(() => {
          router.push("/users");
        })
        .catch((data) => {
          // eslint-disable-next-line no-debugger
          debugger;
          _self.errors = data;
          this.$store.dispatch("alert/error", data, { root: true });
        });
    },
    resetActivationCode() {
      const _self = this;
      usersService
        .resetActivationCode(this.editedItem.externalId)
        .catch((data) => {
          // eslint-disable-next-line no-debugger
          debugger;
          _self.errors = data;
          this.$store.dispatch("alert/error", data, { root: true });
        });
    },
  },
  created() {},
  mounted() {
    this.editedItem = this.defaultItem;
    this.$store.dispatch("users/get", this.id);
  },
  watch: {
    user(newValue) {
      this.editedItem = newValue;
    },
  },
};
</script>
<style lang="sass" scoped>
</style>
