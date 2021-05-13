<template>
  <div class="login">
    <div class="p-grid p-jc-center">
		<div class="p-col-12 p-md-4">
      <div class="card p-fluid">
				<h5>Sign In</h5>
				<div class="p-field">
					<label for="name1">Username</label>
					<InputText id="name1" type="text"  v-model="username" />
				</div>
				<div class="p-field">
					<label for="password">Password</label>
					<InputText id="password" type="password" v-model="password" />
				</div>
                <p> If you don't have an account yet. 
                    <a href="/register">Sign Up</a>
                    </p>
        <Button label="Sign In" @click="handleSubmit($event)"></Button>
			</div>

    </div>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false,
            drawer: null,
            rules: {
                 required: value => !!value || 'Required.',
            }
        }
    },
    computed: {
        loggingIn () {
            return this.$store.state.authentication.status.loggingIn;
        }
    },
    created () {
    },
    methods: {
        handleSubmit () {
            this.submitted = true;
            const { username, password } = this;
            const { dispatch } = this.$store;
            if (username && password) {
                dispatch('authentication/login', { username, password });
            }
        }
    }
};
</script>
