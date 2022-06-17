import { NavigationContainer } from '@react-navigation/native'
import { useStore } from 'effector-react'
import { locale } from 'expo-localization'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import { getCurrentTranslation } from './locales'
import Navigation from './navigation'
import { $isInitialDataLoaded } from './store'
import { requestInitialData, requestPermissions } from './store/main'
import { OnErrorFn } from '@formatjs/intl/src/types'
import 'intl'
import 'intl/locale-data/jsonp/en'
import moment from 'moment'

export default function App() {
    const isLoadingComplete = useCachedResources()
    const isInitialDataLoaded = useStore($isInitialDataLoaded)

    const handleIntlError = useCallback<OnErrorFn>((error) => {
        if (process.env.NODE_ENV !== 'development') {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        if (isLoadingComplete) {
            requestInitialData()
            requestPermissions()
        }
    }, [isLoadingComplete])

    useEffect(() => {
        if (isInitialDataLoaded) {
            moment.locale(locale)
        }
    }, [isInitialDataLoaded])

    if (isInitialDataLoaded) {
        return (
            <IntlProvider
                messages={getCurrentTranslation(locale)}
                locale={locale}
                defaultLocale="en"
                onError={handleIntlError}
            >
                <PaperProvider>
                    <SafeAreaProvider>
                        <NavigationContainer>
                            <Navigation />
                        </NavigationContainer>
                        <StatusBar />
                    </SafeAreaProvider>
                </PaperProvider>
            </IntlProvider>
        )
    } else {
        return null
    }
}
