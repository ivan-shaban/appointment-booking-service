import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import { ScreenHeader } from '../components/ScreenHeader'
import { colorByTab } from '../constants/Colors'
import { Tab } from '../constants/Tab'
import { FavouriteScreen } from '../screens/FavouriteScreen'
import { LocationsScreen } from '../screens/LocationsScreen'
import { MastersScreen } from '../screens/MastersScreen'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { RootStackParamList, RootTabParamList } from '../types'

const Stack = createNativeStackNavigator<RootStackParamList>()
const BottomTab = createMaterialBottomTabNavigator<RootTabParamList>()

export default function Navigation() {
    return (
        <Stack.Navigator
            initialRouteName={'Root'}
            screenOptions={{
                headerBackButtonMenuEnabled: true,
                header: ScreenHeader,
            }}
        >
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

function BottomTabNavigator() {
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
}
