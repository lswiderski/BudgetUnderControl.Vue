<template>
  <div class="login">
    <div class="p-grid p-jc-center">
		<div class="p-col-12 p-md-4">
      <div class="card p-fluid">
				<h5>Register</h5>
                <div class="p-field">
					<label for="firstName">First Name</label>
					<InputText id="firstName" type="text"  v-model="firstName" />
				</div>
                <div class="p-field">
					<label for="lastName">Last Name</label>
					<InputText id="lastName" type="text"  v-model="lastName" />
				</div>
                <div class="p-field">
					<label for="email">E-mail</label>
					<InputText id="email" type="email"  v-model="email" />
				</div>
				<div class="p-field">
					<label for="name1">Username</label>
					<InputText id="name1" type="text"  v-model="username" />
				</div>
				<div class="p-field">
					<label for="password">Password</label>
					<InputText id="password" type="password" v-model="password" />
				</div>
                <div class="p-field-checkbox">
                <Checkbox id="acceptTerms" name="acceptTerms" v-model="acceptTerms" :binary="true"  />
                  <label for="acceptTerms"> I agree  <a
                          target="_blank"
                          href="/terms"
                           v-tooltip.bottom="'Opens in new window'" 
                        >
                          Terms and Conditions
                        </a> .</label>
				</div>
              
        <Button label="Register" @click="handleSubmit($event)"></Button>
			</div>

    </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data () {
        return {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            submitted: false,
            acceptTerms: false,
            rules: {
                 required: value => !!value || 'Required.',
            }
        }
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
    created () {
        // reset login status
        this.$store.dispatch('authentication/logout');
    },
    methods: {
        ...mapActions("authentication", ["register"]),
        handleSubmit () {
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
