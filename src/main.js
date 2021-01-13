import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'


//引入全局样式
import ('./index.css');

//引入路由控件
import "@/permission";

//引入element ui
import ElementUI from 'element-ui';

Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
