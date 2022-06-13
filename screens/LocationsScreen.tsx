import { ScrollView, StyleSheet } from 'react-native'

import { LocationItem } from '../components/LocationItem'
import { Tab } from '../constants/Tab'
import { locations } from '../datas/locations'
import { RootTabScreenProps } from '../types'

export function LocationsScreen({ navigation }: RootTabScreenProps<Tab.Locations>) {
    return (
        <ScrollView style={styles.container}>
            {locations.map((location) => (
                <LocationItem location={location} key={location.id} />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
