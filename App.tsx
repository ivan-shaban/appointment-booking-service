import { NavigationContainer } from '@react-navigation/native'
import { useStore } from 'effector-react'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import { $isInitialDataLoaded } from './store'
import { requestInitialData, requestPermissions } from './store/main'

export default function App() {
    const isLoadingComplete = useCachedResources()
    const isInitialDataLoaded = useStore($isInitialDataLoaded)

    useEffect(() => {
        if (isLoadingComplete) {
            requestInitialData()
            requestPermissions()
        }
    }, [isLoadingComplete])

    if (isInitialDataLoaded) {
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
