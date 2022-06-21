import { colorByTab } from '../constants/Colors'
import { Tab } from '../constants/Tab'
import { createEvent, createStore } from 'effector'

export const changeHeaderColor = createEvent<string>('change header color')
export const $headerColor = createStore(colorByTab[Tab.Masters]).on(
    changeHeaderColor,
    (_, color) => color,
)
