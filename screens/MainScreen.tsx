import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React, { FC, memo } from 'react'
import { StyleSheet } from 'react-native'

import { colorByTab } from '../constants/Colors'
import { Tab } from '../constants/Tab'
import { RootTabParamList } from '../types'
import { FavouriteScreen } from './FavouriteScreen'
import { LocationsScreen } from './LocationsScreen'
import { MastersScreen } from './MastersScreen'
import { ProfileScreen } from './ProfileScreen'

const BottomTab = createMaterialBottomTabNavigator<RootTabParamList>()

export interface Props {}

export const MainScreen: FC<Props> = memo(function MainScreen(props) {
    return (
        <BottomTab.Navigator
            initialRouteName={Tab.Masters}
            shifting={true}
            sceneAnimationEnabled={false}
        >
            <BottomTab.Screen
                name={Tab.Masters}
                component={MastersScreen}
                options={{
                    title: 'Masters',
                    tabBarIcon: 'account-group-outline',
                    tabBarBadge: 2,
                    tabBarColor: colorByTab[Tab.Masters],
                }}
            />
            <BottomTab.Screen
                name={Tab.Locations}
                component={LocationsScreen}
                options={{
                    title: 'Locations',
                    tabBarIcon: 'map-marker-multiple-outline',
                    tabBarColor: colorByTab[Tab.Locations],
                }}
            />
            <BottomTab.Screen
                name={Tab.Favourite}
                component={FavouriteScreen}
                options={{
                    title: 'Favourite',
                    tabBarIcon: 'cards-heart-outline',
                    tabBarColor: colorByTab[Tab.Favourite],
                }}
            />
            <BottomTab.Screen
                name={Tab.Profile}
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                    tabBarIcon: 'account',
                    tabBarColor: colorByTab[Tab.Profile],
                }}
            />
        </BottomTab.Navigator>
    )
})

const styles = StyleSheet.create({
    base: {},
})
