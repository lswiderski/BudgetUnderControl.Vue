<template>
  <v-data-table :headers="headers" :items="users.items" :items-per-page="15">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Users</v-toolbar-title>
        <v-divider class="mx-6" inset vertical></v-divider>
        <div class="flex-grow-1"></div>
      </v-toolbar>
    </template>
    <template v-slot:[`item.username`]="{ item }">
      <a  :href ="`/user/${item.externalId}`">  {{ item.username }}</a>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
     
      headers: [
          { text: "Login", value: "username" },
        { text: "Last name", value: "lastName" },
        { text: "Last name", value: "firstName" },
        { text: "Email", value: "email" },
        { text: "Role", value: "roleName" },
        { text: "Actions", sortable: false, value: "action" }
      ]
    };
  },
  computed: {
    users() {
      return this.$store.state.users.users;
    },
  },
  created() {
    this.$store.dispatch("users/getAll");
  },
  methods: {
  },
  watch: {
  }
};
</script>