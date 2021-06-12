<template>
  <div class="login">
    <div class="p-grid p-jc-center">
      <div class="p-col-12 p-md-4">
        <div class="card p-fluid">
          <h5>Register</h5>
          <div class="p-field">
            <label for="firstName">First Name</label>
            <InputText id="firstName" type="text" v-model="firstName" />
          </div>
          <div class="p-field">
            <label for="lastName">Last Name</label>
            <InputText id="lastName" type="text" v-model="lastName" />
          </div>
          <div class="p-field">
            <label for="email">E-mail</label>
            <InputText
              id="email"
              type="email"
              v-model="email"
              :class="{
                'p-invalid': (v$.email.$invalid && submitted) || errors.Email,
              }"
            />
            <span v-if="v$.email.$silentErrors && submitted">
              <span
                id="email-error"
                v-for="(error, index) of v$.email.$silentErrors"
                :key="index"
              >
                <small class="p-error">{{
                  error.$message.replace("Value", "E-mail")
                }}</small>
              </span>
            </span>
            <small
              class="p-error"
              v-else-if="v$.email.$invalid && submitted"
              >{{
                v$.email.required.$message.replace("Value", "E-mail")
              }}</small
            >
            <small class="p-error" v-if="errors.Email">
              {{ errors.Email }}</small
            >
          </div>
          <div class="p-field">
            <label for="username">Username</label>
            <InputText
              id="username"
              type="text"
              v-model="username"
              :class="{
                'p-invalid':
                  (submitted && v$.username.$invalid) || errors.Username,
              }"
            />
            <small
              class="p-error"
              v-if="v$.username.$invalid && submitted"
              >{{
                v$.username.required.$message.replace("Value", "Username")
              }}</small
            >

            <small class="p-error" v-else-if="errors.Username">
              {{ errors.Username }}</small
            >
          </div>
          <div class="p-field">
            <label for="password">Password</label>
            <InputText
              id="password"
              type="password"
              v-model="password"
              :class="{
                'p-invalid':
                  (submitted && v$.password.$invalid) || errors.Password,
              }"
            />
            <small
              class="p-error"
              v-if="v$.password.$invalid && submitted"
              >{{
                v$.password.required.$message.replace("Value", "Password")
              }}</small
            >
            <small class="p-error" v-else-if="errors.Password">
              {{ errors.Password }}</small
            >
          </div>
          <div class="p-field-checkbox">
            <Checkbox
              id="acceptTerms"
              name="acceptTerms"
              v-model="acceptTerms"
              :binary="true"
            />
            <label for="acceptTerms">
              I agree
              <a
                target="_blank"
                href="/terms"
                v-tooltip.bottom="'Opens in new window'"
              >
                Terms and Conditions
              </a>
              .</label
            >
          </div>

          <Button label="Register" @click="handleSubmit()"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { loginService } from "../../services";
import { mapServerSideErrors } from "../../_helpers";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      acceptTerms: false,
      submitted: false,
      errors: [],
    };
  },
  validations() {
    return {
      username: { required, },
      password: { required, },
      email: { required, email, },
    };
  },
  created() {
    this.$store.dispatch("authentication/logout");
  },
  methods: {
    mapServerSideError(error) {
      const { dispatch } = this.$store;
      if (error.errorType === "Validation") {
        this.errors = Object.assign(
          {},
          ...error.errors.map((x) => ({ [x.propertyName]: x.errorMessage }))
        );
      }
      dispatch("authentication/registerFailure", error);
    },
    handleSubmit() {
      this.submitted = true;

      if (this.v$.$invalid) {
        return;
      }
      const _self = this;
      const { username, password, email, firstName, lastName, acceptTerms } =
        this;

      const { dispatch } = this.$store;
      if (username && password && email && acceptTerms) {
        dispatch("authentication/registerRequest");
        loginService
          .register({
            username,
            password,
            email,
            firstName,
            lastName,
          })
          .then(
            () => {
              dispatch("authentication/registerSuccess");
            },
            (error) => {
              _self.errors = mapServerSideErrors(error);
               dispatch("authentication/loginFailure", error);
            }
          );
      }
    },
  },
};
</script>
