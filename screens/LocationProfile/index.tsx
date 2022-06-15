import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native'
import { Divider, Subheading } from 'react-native-paper'

import { LocationFeedbackInline } from '../../components/LocationFeedbackInline'
import { MasterItem } from '../../components/MasterItem'
import { Paragpaph } from '../../components/Paragpaph'
import { PhoneRecord } from '../../components/PhoneRecord'
import { Schedule } from '../../components/Schedule'
import { locations } from '../../datas/locations'
import { masters } from '../../datas/masters'
import { RootStackScreenProps } from '../../types'
import faker from '@faker-js/faker'

export function LocationProfile({ navigation, route }: RootStackScreenProps<'LocationProfile'>) {
    const location = locations.find(({ id }) => id === route.params.id)!
    const localMasters = masters.filter(({ locationId }) => locationId === route.params.id)!

    // const [fabOpen, setFabOpen] = useState(false)
    //
    // const onStateChange = ({ open }) => setFabOpen(open)

    return (
        <ScrollView style={styles.base}>
            <Image style={styles.gallery} source={{ uri: location.gallery[0] }} />
            <Paragpaph icon="image-text" title={location.name}>
                <Subheading>{location.description}</Subheading>
            </Paragpaph>
            <Divider />
            <Paragpaph icon="map-outline" title="Address">
                <Subheading>{location.address}</Subheading>
            </Paragpaph>
            <Divider />
            <Paragpaph icon="phone-outline" title="Contacts">
                {location.tel.map((tel) => (
                    <PhoneRecord key={tel} phone={tel} />
                ))}
            </Paragpaph>
            <Divider />
            <Paragpaph icon="clock-outline" title="Schedule">
                {location.schedules.map((schedule, index) => (
                    <Schedule key={index} value={schedule} index={index} />
                ))}
            </Paragpaph>
            <Divider />
            <Paragpaph icon="currency-usd" title="Service">
                {location.tel.map((tel) => (
                    <Subheading key={tel}>{tel}</Subheading>
                ))}
            </Paragpaph>
            <Divider />
            <Paragpaph icon="account-group-outline" title="Masters">
                <View style={{ marginLeft: -50 }}>
                    {localMasters.map((master) => (
                        <MasterItem master={master} key={master.id} />
                    ))}
                </View>
            </Paragpaph>
            <Divider />
            <Paragpaph icon="comment-text-multiple-outline" title="Feedbacks">
                {/*<Paragpaph icon="list-status" title="Feedbacks">*/}
                {location.feedbacks.map((feedback) => (
                    <LocationFeedbackInline key={feedback.id} feedback={feedback} />
                ))}
            </Paragpaph>
            <Divider />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    gallery: {
        width: Dimensions.get('window').width,
        height: 250,
    },
    feedbackBadge: {
        marginTop: 5,
        marginRight: 50,
    },
    favouriteButton: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 160,
        left: 250,
    },
})
