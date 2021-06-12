<template>
  <div class="login">
    <div class="p-grid p-jc-center">
      <div class="p-col-12 p-md-4">
        <div class="card p-fluid">
          <h5>Sign In</h5>
          <div class="p-field">
            <label for="name1">Username</label>
            <InputText
              id="name1"
              type="text"
              v-model="username"
              :class="{ 'p-invalid': submitted && !username }"
            />
            <small
              class="p-error"
              v-if="
                (v$.username.$invalid && submitted) ||
                v$.username.$pending.$response
              "
              >{{
                v$.username.required.$message.replace("Value", "Username")
              }}</small
            >
          </div>
          <div class="p-field">
            <label for="password">Password</label>
            <InputText
              id="password"
              type="password"
              v-model="password"
              :class="{ 'p-invalid': submitted && !password }"
            />
            <small
              class="p-error"
              v-if="
                (v$.password.$invalid && submitted) ||
                v$.password.$pending.$response
              "
              >{{
                v$.password.required.$message.replace("Value", "Password")
              }}</small
            >
            <small class="p-error" v-if="errors['passwords'] !== undefined">
              {{ errors["passwords"] }}</small
            >
          </div>
          <p>
            If you don't have an account yet.
            <a href="/register">Sign Up</a>
          </p>
          <Button
            label="Sign In"
            type="submit"
            @click="handleSubmit($event)"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { loginService } from "../../services";

export default {
  components: {},
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      drawer: null,
      errors: [],
    };
  },
  validations() {
    return { username: { required }, password: { required } };
  },
  computed: {
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    },
  },
  created() {},
  methods: {
    mapServerSideError(error) {
      const { dispatch } = this.$store;
      this.errors["passwords"] = "The username or password is incorrect";
      dispatch("authentication/loginFailure", error);
    },
    handleSubmit() {
      this.submitted = true;
      const _self = this;
      const { username, password } = this;
      const { dispatch } = this.$store;
      if (username && password) {
        dispatch("authentication/loginRequest");
        loginService.login(username, password).then(
          (result) => {
            const { token, user } = result;
            dispatch("authentication/loginSuccess", { token, user });
          },
          (error) => {
            _self.mapServerSideError(error);
          }
        );
      }
    },
  },
};
</script>
