import { createApp } from 'vue';
import vSelect from 'vue-select';
import App from './App.vue';
import router from './router';
import store from './store/index';
import Toast from "vue-toastification";
import 'bootstrap';
import "vue-select/dist/vue-select.css";
import "vue-toastification/dist/index.css";
import toastMixin from './mixins/toastMixin';



const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast);

app.mixin(toastMixin);

app.component('v-select', vSelect);

app.mount("#app");
