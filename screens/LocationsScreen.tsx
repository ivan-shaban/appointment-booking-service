import { useStore } from 'effector-react'
import { ScrollView, StyleSheet } from 'react-native'

import { LocationItem } from '../components/LocationItem'
import { Tab } from '../constants/Tab'
import { $locations } from '../store/locations'
import { RootTabScreenProps } from '../types'

export function LocationsScreen({ navigation }: RootTabScreenProps<Tab.Locations>) {
    const locations = useStore($locations)

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
