<template>

      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
                 <v-form @submit.prevent="handleSubmit">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>User Activation</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
               
                  <v-text-field
                    label="Activation Code"
                    name="code"
                    prepend-icon="mdi-code-tags"
                    type="text"
                    v-model="code"
                    class="form-control" :class="{ 'is-invalid': submitted && !code }"
                    :rules="[rules.required]"
                  ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                 <img v-show="activating" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <v-btn 
                color="secondary"
                to="/login"
                >Logout</v-btn>
                <v-btn 
                color="secondary"
                @click="resetCode"
                >Resend</v-btn>
                <v-btn 
                type="submit"
                color="primary"
                :disabled="activating"
                >Activate</v-btn>
              </v-card-actions>
               </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

</template>



<script>

import { loginService } from "../../_services";

export default {
    data () {
        return {
            code: '',
            submitted: false,
            drawer: null,
            rules: {
                 required: value => !!value || 'Required.',
            }
        }
    },
    computed: {
        activating () {
            return this.$store.state.authentication.status.activating;
        }
    },
    created () {
      this.code = this.$route.query.code;
    },
    methods: {
        handleSubmit () {
            this.submitted = true;
            const { code } = this;
            const { dispatch } = this.$store;
            if (code) {
                dispatch('authentication/activate', { code });
            }
        },
        resetCode() {
          loginService.resetActivationCode();
        }
    }
};
</script>