import { ScrollView, StyleSheet } from 'react-native'

import { MasterItem } from '../components/MasterItem'
import { Tab } from '../constants/Tab'
import { masters } from '../datas/masters'
import { RootTabScreenProps } from '../types'

export function MastersScreen({ navigation }: RootTabScreenProps<Tab.Masters>) {
    return (
        <ScrollView style={styles.container}>
            {masters.map((master) => (
                <MasterItem master={master} key={master.id} />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
