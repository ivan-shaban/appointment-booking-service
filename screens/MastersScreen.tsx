import { StyleSheet } from 'react-native'
import { Headline } from 'react-native-paper'

import { View } from '../components/Themed'
import { Tab } from '../constants/Tab'
import { RootTabScreenProps } from '../types'

export function MastersScreen({ navigation }: RootTabScreenProps<Tab.Masters>) {
    return (
        <View style={styles.container}>
            <Headline>Masters</Headline>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
