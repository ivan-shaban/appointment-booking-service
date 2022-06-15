import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import { requestPhoneCallPermission } from './permissions/PhoneCall'

export default function App() {
    const isLoadingComplete = useCachedResources()

    useEffect(() => {
        if (isLoadingComplete) {
            requestPhoneCallPermission()
        }
    }, [isLoadingComplete])

    if (isLoadingComplete) {
        return (
            <PaperProvider>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <Navigation />
                    </NavigationContainer>
                    <StatusBar />
                </SafeAreaProvider>
            </PaperProvider>
        )
    } else {
        return null
    }
}
