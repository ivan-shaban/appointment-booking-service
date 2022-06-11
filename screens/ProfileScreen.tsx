import { StyleSheet } from 'react-native'
import { Headline } from 'react-native-paper'

import { View } from '../components/Themed'
import { Tab } from '../constants/Tab'
import { RootTabScreenProps } from '../types'

export function ProfileScreen({ navigation }: RootTabScreenProps<Tab.Profile>) {
    return (
        <View style={styles.container}>
            <Headline>Profile</Headline>
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
