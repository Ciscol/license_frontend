import Vue from 'vue'
import { Button, Checkbox, CheckboxGroup, Container, Footer, Form, FormItem, Header, Input, InputNumber, Loading, Main, Message, MessageBox, TabPane, Tabs } from 'element-ui'

Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Container)
Vue.use(Footer)
Vue.use(Header)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Loading)
Vue.use(Main)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;