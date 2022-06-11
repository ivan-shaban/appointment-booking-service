import { ScrollView, StyleSheet } from 'react-native'
import { Headline } from 'react-native-paper'

import { MasterItem } from '../components/MasterItem'
import { View } from '../components/Themed'
import { Tab } from '../constants/Tab'
import { masters } from '../datas/masters'
import { RootTabScreenProps } from '../types'

export function MastersScreen({ navigation }: RootTabScreenProps<Tab.Masters>) {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.list}>
                {masters.map((master) => (
                    <MasterItem master={master} key={master.id} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {},
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
