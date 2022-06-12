/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Tab } from './constants/Tab'
import { Master } from './datas/masters'

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Root?: NavigatorScreenParams<RootTabParamList>
    Modal: undefined
    MasterProfile: { id: number } & NavigatorScreenParams<MasterProfileTabParamList>
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>

export type RootTabParamList = {
    [Tab.Masters]: undefined
    [Tab.Locations]: undefined
    [Tab.Favourite]: undefined
    [Tab.Profile]: undefined
}

export type MasterProfileTabParamList = {
    Description: { master: Master }
    Feedbacks: { master: Master }
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>
