/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import { Tab } from '../constants/Tab'
import { RootStackParamList } from '../types'

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.makeUrl('/')],
    config: {
        initialRouteName: 'Root',
        screens: {
            Root: {
                initialRouteName: Tab.Locations,
                // initialRouteName: Tab.Masters,
                path: 'root',
                screens: {
                    [Tab.Masters]: {
                        path: 'masters',
                    },
                    [Tab.Locations]: {
                        path: 'locations',
                    },
                    [Tab.Favourite]: {
                        path: 'favourite',
                    },
                    [Tab.Profile]: {
                        path: 'profile',
                    },
                },
            },
            MasterProfile: {
                path: 'masters/:id',
                // initialRouteName: Tab.Locations,
                // screens: {
                //     Description: {
                //         screens: {
                //             MastersScreen: 'one',
                //         },
                //     },
                //     Feedbacks: {
                //         screens: {
                //             LocationsScreen: 'two',
                //         },
                //     },
                // },
            },
            LocationProfile: {
                path: 'locations/:id',
            },
            Modal: 'modal',
        },
    },
}

export default linking
