<template>
  <div class="login">
    <div class="p-grid p-jc-center">
		<div class="p-col-12 p-md-4">
      <div class="card p-fluid">
				<h5>User Activation</h5>
				<div class="p-field">
					<label for="code">Activation Code</label>
					<InputText id="code" type="text"  v-model="code" />
				</div>
                <span class="p-buttonset">
                    <Button label="Logout" @click="logout($event)" class="p-button-secondary"></Button>
                    <Button label="Resend" @click="resetCode($event)" class="p-button-secondary"></Button>
                    <Button label="Activate" @click="handleSubmit($event)" ></Button>
                </span>
			</div>

    </div>
      </div>
  </div>
</template>

<script>
import { loginService } from "../../services";
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
        },
        logout() {
            this.$store.dispatch('authentication/logout');
            this.$router.push('login');
        }
    }
};
</script>
