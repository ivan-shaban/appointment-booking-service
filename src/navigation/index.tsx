import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import { ScreenHeader } from '../components/ScreenHeader'
import { LocationProfile } from '../screens/LocationProfile'
import { MainScreen } from '../screens/MainScreen'
import { MasterProfile } from '../screens/MasterProfile'
import ModalScreen from '../screens/ModalScreen'
import { RootStackParamList } from '../types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Navigation() {
    return (
        <Stack.Navigator
            initialRouteName="Root"
            screenOptions={{
                header: ScreenHeader,
            }}
        >
            <Stack.Screen name="Root" component={MainScreen} />
            <Stack.Screen name="MasterProfile" component={MasterProfile} />
            <Stack.Screen name="LocationProfile" component={LocationProfile} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}
