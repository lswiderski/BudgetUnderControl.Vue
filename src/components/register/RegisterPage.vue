<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-form @submit.prevent="handleSubmit">
             <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Register</v-toolbar-title>
              <div class="flex-grow-1"></div>
            </v-toolbar>
            <v-card-text>
               <v-text-field
                id="firstName"
                label="First Name"
                name="firstName"
                prepend-icon="mdi-account-box"
                type="text"
                v-model="firstName"
                class="form-control"
                :class="{ 'is-invalid': submitted && !firstName }"
              ></v-text-field>
              <v-text-field
                id="lastName"
                label="Last Name"
                name="lastName"
                prepend-icon="mdi-account-box"
                type="text"
                v-model="lastName"
                class="form-control"
                :class="{ 'is-invalid': submitted && !lastName }"
              ></v-text-field>
              <v-text-field
                label="E-mail"
                name="email"
                prepend-icon="mdi-email"
                type="email"
                v-model="email"
                class="form-control"
                :class="{ 'is-invalid': submitted && !email }"
                :rules="[rules.required]"
              ></v-text-field>
              <div
                v-if="submitted && errors.Email"
                class="ml-8 v-messages theme--light error--text"
              >
                <ul>
                  <li v-for="(error, i) in errors.Email" :key="i">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <v-text-field
                label="Username"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
                class="form-control"
                :class="{ 'is-invalid': submitted && !username }"
                :rules="[rules.required]"
              ></v-text-field>
              <div
                v-if="submitted && errors.Username"
                class="ml-8 v-messages theme--light error--text"
              >
                <ul>
                  <li v-for="(error, i) in errors.Username" :key="i">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                class="form-control"
                :class="{ 'is-invalid': submitted && !password }"
                :rules="[rules.required]"
              ></v-text-field>
              <div
                v-if="submitted && errors.Password"
                class="ml-8 v-messages theme--light error--text"
              >
                <ul>
                  <li v-for="(error, i) in errors.Password" :key="i">
                    {{ error }}
                  </li>
                </ul>
              </div>
             
              <v-checkbox v-model="acceptTerms" :rules="[rules.required]">
                <template v-slot:label>
                  <div>
                    I agree
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <a
                          target="_blank"
                          href="/terms"
                          @click.stop
                          v-on="on"
                        >
                          Terms and Conditions
                        </a>
                      </template>
                      Opens in new window
                    </v-tooltip>
                    .
                  </div>
                </template>
              </v-checkbox>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <img
                v-show="registering"
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
              <v-btn type="submit" color="primary" :disabled="registering"
                >Register</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      acceptTerms: false,
      submitted: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    ...mapState("authentication", ["status", "errors"]),
    registering() {
      return this.$store.state.authentication.status.registering;
    },
    showEmailError() {
      return this.errors && this.errors.Email;
    },
  },
  created() {
    // reset login status
    this.$store.dispatch("authentication/logout");
  },
  methods: {
    ...mapActions("authentication", ["register"]),
    handleSubmit() {
      this.submitted = true;
      const {
        username,
        password,
        email,
        firstName,
        lastName,
        acceptTerms,
      } = this;
      const { dispatch } = this.$store;
      if (username && password && email && acceptTerms) {
        dispatch("authentication/register", {
          username,
          password,
          email,
          firstName,
          lastName,
        });
      }
    },
  },
};
</script>