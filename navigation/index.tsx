import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { useState } from 'react'
import { ColorSchemeName, Platform, View } from 'react-native'
import { BottomNavigation, Text } from 'react-native-paper'

import { ScreenHeader } from '../components/ScreenHeader'
import { colorByTab } from '../constants/Colors'
import { Tab } from '../constants/Tab'
import { FavouriteScreen } from '../screens/FavouriteScreen'
import { LocationsScreen } from '../screens/LocationsScreen'
import { MastersScreen } from '../screens/MastersScreen'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types'
import LinkingConfiguration from './LinkingConfiguration'

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
    // const [index, setIndex] = useState(0)
    // const [routes] = useState([
    //     {
    //         key: 'masters',
    //         title: 'Masters',
    //         icon: 'account-group-outline',
    //         color: '#ff0000',
    //         badge: 2,
    //     },
    //     {
    //         key: 'locations',
    //         title: 'Locations',
    //         icon: 'map-marker-multiple-outline',
    //         color: '#00ff00',
    //     },
    //     { key: 'favourite', title: 'Favourite', icon: 'cards-heart-outline', color: '#0000ff' },
    //     { key: 'profile', title: 'Profile', icon: 'account', color: '#0000ff' },
    // ])
    //
    // const renderScene = BottomNavigation.SceneMap({
    //     masters: MusicRoute,
    //     locations: AlbumsRoute,
    //     favourite: RecentsRoute,
    //     profile: RecentsRoute,
    // })
    //
    // return (
    //     <BottomNavigation
    //         shifting={true}
    //         navigationState={{ index, routes }}
    //         onIndexChange={setIndex}
    //         renderScene={renderScene}
    //     />
    // )

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
