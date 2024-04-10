import { createApp } from 'vue'
import App from './App.vue'

import './style.css'
import "./assets/js/fontawesome";

import { EasyVhip } from 'vhip-easybuild-api';

const app = createApp(App);

app.use(EasyVhip, { autoConnect: false });

app.mount('#app')
