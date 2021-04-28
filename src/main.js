import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Configuration from './_helpers/configuration';

axios.defaults.baseURL = Configuration.value('backendHost');

import { usePrimeVue } from './_helpers';

import 'primevue/resources/themes/saga-blue/theme.css'; // theme
import 'primevue/resources/primevue.min.css'; // core css
import 'primeicons/primeicons.css'; // icons

const app = createApp(App);
app.config.globalProperties.$appState = reactive({ inputStyle: 'outlined' });
usePrimeVue(app);

app.use(store)
  .use(VueAxios, axios)
  .use(router)
  .mount('#app');
