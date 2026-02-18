import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import { semantic } from './semantic'
import { components } from './components/Components.js'

export const myPreset = definePreset(Aura, {
	semantic,
	components,
})
