import { useStore } from 'effector-react'
import { ScrollView, StyleSheet } from 'react-native'
import { Subheading } from 'react-native-paper'

import { LocationItem } from '../components/LocationItem'
import { MasterItem } from '../components/MasterItem'
import { View } from '../components/Themed'
import { Tab } from '../constants/Tab'
import { $locations } from '../store/locations'
import { $masters } from '../store/masters'
import { $currentUser } from '../store/user'
import { RootTabScreenProps } from '../types'

export function FavouriteScreen({ navigation }: RootTabScreenProps<Tab.Favourite>) {
    const currentUser = useStore($currentUser)
    const masters = useStore($masters)
    const locations = useStore($locations)

    return (
        <View style={styles.container}>
            <ScrollView>
                <Subheading>Masters:</Subheading>
                {currentUser?.favourite.masters
                    .map((masterId) => masters.find(({ id }) => id === masterId))
                    .filter((master) => master !== undefined)
                    .map((master) => (
                        <MasterItem master={master!} key={master!.id} />
                    ))}
                <Subheading>Locations:</Subheading>
                {currentUser?.favourite.locations
                    .map((locationId) => locations.find(({ id }) => id === locationId))
                    .filter((location) => location !== undefined)
                    .map((location) => (
                        <LocationItem location={location!} key={location!.id} />
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
})
