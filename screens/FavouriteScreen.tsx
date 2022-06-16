import { useStore } from 'effector-react'
import React from 'react'
import { Dimensions, ScrollView, StyleSheet } from 'react-native'
import { Subheading } from 'react-native-paper'

import { LocationItem } from '../components/LocationItem'
import { MasterItem } from '../components/MasterItem'
import { Paragpaph } from '../components/Paragpaph'
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
        <ScrollView style={styles.base}>
            <Paragpaph icon="account-group-outline" title="Masters">
                <View style={styles.pContent}>
                    {currentUser?.favourite.masters
                        .map((masterId) => masters.find(({ id }) => id === masterId))
                        .filter((master) => master !== undefined)
                        .map((master) => (
                            <MasterItem master={master!} key={master!.id} />
                        ))}
                </View>
            </Paragpaph>
            <Paragpaph icon="map-marker-multiple-outline" title="Locations">
                <View style={styles.pContent}>
                    {currentUser?.favourite.locations
                        .map((locationId) => locations.find(({ id }) => id === locationId))
                        .filter((location) => location !== undefined)
                        .map((location) => (
                            <LocationItem location={location!} key={location!.id} />
                        ))}
                </View>
            </Paragpaph>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    pContent: { marginLeft: -50, width: Dimensions.get('screen').width },
})
