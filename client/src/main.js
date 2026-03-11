import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import FloatLabel from "primevue/floatlabel";
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import Password from 'primevue/password'
import Drawer from 'primevue/drawer'
import Menu from 'primevue/menu'
import Tooltip from 'primevue/tooltip'
import { myPreset } from './config/primevue/myPreset.js'
import Breadcrumb from 'primevue/breadcrumb'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import ConfirmDialog from 'primevue/confirmdialog'
import Card from 'primevue/card'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import Tag from 'primevue/tag'
import Chip from 'primevue/chip'
import AutoComplete from 'primevue/autocomplete'
import Toast from 'primevue/toast'
import Checkbox from 'primevue/checkbox'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import DataView from 'primevue/dataview'
import Divider from 'primevue/divider';
import Editor from 'primevue/editor';
import ToggleSwitch from 'primevue/toggleswitch';


import App from './App.vue'
import router from './router'
import './styles/main.scss'
import './styles/tokens.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ConfirmationService)
app.use(ToastService)

app.use(PrimeVue, {
	theme: {
		preset: myPreset,
		options: {
			darkModeSelector: '.dark-mode',
		},
	},
})

app.component('Button', Button)
app.component('InputText', InputText)
app.component('Textarea', Textarea)
app.component("InputGroup", InputGroup);
app.component("InputGroupAddon", InputGroupAddon);
app.component("FloatLabel", FloatLabel);
app.component('ProgressSpinner', ProgressSpinner)
app.component('Message', Message)
app.component('Password', Password)
app.component('Drawer', Drawer)
app.component('Menu', Menu)
app.component('Breadcrumb', Breadcrumb)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Card', Card)
app.component('DatePicker', DatePicker)
app.component('Select', Select)
app.component('Tag', Tag)
app.component('Chip', Chip)
app.component('AutoComplete', AutoComplete)
app.component('Toast', Toast)
app.component('Checkbox', Checkbox)
app.component('Accordion', Accordion)
app.component('AccordionPanel', AccordionPanel)
app.component('AccordionHeader', AccordionHeader)
app.component('AccordionContent', AccordionContent)
app.component('DataView', DataView)
app.component('Divider', Divider)
app.component('Editor', Editor)
app.component('ToggleSwitch', ToggleSwitch)

app.directive('tooltip', Tooltip)

app.mount('#app')
