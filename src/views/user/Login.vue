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
                <small class="p-error" v-if="submitted && !username"
                  >Username is required.</small
                >
              </div>
              <div class="p-field">
               
                  <label for="password">Password</label>
                  <InputText
                    id="password"
                    type="password"
                    v-model="password"
                    :class="{ 'p-invalid': submitted && !username }"
                  />
                  <small class="p-error" v-if="submitted && !password"
                    >Password is required.</small
                  >
                  <span>{{ errors[0] }}</span>
              
              </div>
              <p>
                If you don't have an account yet.
                <a href="/register">Sign Up</a>
              </p>
              <Button label="Sign In" type="submit" @click="handleSubmit($event)"></Button>
            </div>
          </div>
        </div>
      </div>

</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      drawer: null,
      errors:[],
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    },
  },
  created() {},
  methods: {
    handleSubmit() {
      this.submitted = true;
      const { username, password } = this;
      const { dispatch } = this.$store;
      if (username && password) {
        dispatch("authentication/login", { username, password });
      }
    },
  },
};
</script>
