import { useIntl } from 'react-intl'
import { StyleSheet } from 'react-native'
import { Headline } from 'react-native-paper'

import { View } from '../components/Themed'
import { Tab } from '../constants/Tab'
import { menuLocale } from '../locales/menu'
import { RootTabScreenProps } from '../types'

export function ProfileScreen({ navigation }: RootTabScreenProps<Tab.Profile>) {
    const intl = useIntl()

    return (
        <View style={styles.container}>
            <Headline>{intl.formatMessage(menuLocale[Tab.Profile])}</Headline>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
