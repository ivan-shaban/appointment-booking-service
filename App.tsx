import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'

export default function App() {
    const isLoadingComplete = useCachedResources()

    if (!isLoadingComplete) {
        return null
    } else {
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
    }
}
