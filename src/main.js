import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import GStore from "./store"
import "./css/tailwind.css"
import "./css/index.css"

const app = createApp(App)
app.use(router).provide("GStore", GStore)
app.mount("#app")
