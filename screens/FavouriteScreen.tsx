import { ScrollView, StyleSheet } from 'react-native'
import { Headline, Subheading } from 'react-native-paper'

import { LocationItem } from '../components/LocationItem'
import { MasterItem } from '../components/MasterItem'
import { View } from '../components/Themed'
import { Tab } from '../constants/Tab'
import { locations } from '../datas/locations'
import { masters } from '../datas/masters'
import { RootTabScreenProps } from '../types'

export function FavouriteScreen({ navigation }: RootTabScreenProps<Tab.Favourite>) {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Subheading>Masters:</Subheading>
                {masters
                    .filter(({ isFavourite }) => isFavourite)
                    .map((master) => (
                        <MasterItem master={master} key={master.id} />
                    ))}
                <Subheading>Locations:</Subheading>
                {locations
                    .filter(({ isFavourite }) => isFavourite)
                    .map((location) => (
                        <LocationItem location={location} key={location.id} />
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
