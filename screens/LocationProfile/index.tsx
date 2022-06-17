import { useStore } from 'effector-react'
import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { Subheading } from 'react-native-paper'

import { FeedbackEntry } from '../../components/FeedbackEntry'
import { LocationWorkStatus } from '../../components/LocationWorkStatus'
import { MasterItem } from '../../components/MasterItem'
import { Paragpaph } from '../../components/Paragpaph'
import { PhoneRecord } from '../../components/PhoneRecord'
import { RatingEntry } from '../../components/RatingEntry'
import { Schedule } from '../../components/Schedule'
import { ServiceChip } from '../../components/ServiceChip'
import { ScrollView } from '../../components/Themed'
import { Tab } from '../../constants/Tab'
import { Service } from '../../constants/services'
import { menuLocale } from '../../locales/menu'
import { subheadersLocale } from '../../locales/subheaders'
import { $locations } from '../../store/locations'
import { $masters } from '../../store/masters'
import { RootStackScreenProps } from '../../types'

export function LocationProfile({ navigation, route }: RootStackScreenProps<'LocationProfile'>) {
    const masters = useStore($masters)
    const locations = useStore($locations)
    const location = locations.find(({ id }) => id === route.params.id)!
    const localMasters = masters.filter(({ locationId }) => locationId === route.params.id)!

    // const [fabOpen, setFabOpen] = useState(false)
    //
    // const onStateChange = ({ open }) => setFabOpen(open)

    return (
        <ScrollView style={styles.base} showsVerticalScrollIndicator={true}>
            <Image style={styles.gallery} source={{ uri: location.gallery[0] }} />
            <Paragpaph icon="image-text" title={location.name}>
                <RatingEntry rating={location.rating} feedbacksCount={location.feedbacks.length} />
                <LocationWorkStatus location={location} />
                <Subheading>{location.description}</Subheading>
            </Paragpaph>
            <Paragpaph icon="map-outline" title={subheadersLocale.address}>
                <Subheading>{location.address}</Subheading>
            </Paragpaph>
            <Paragpaph icon="phone-outline" title={subheadersLocale.contacts}>
                {location.tel.map((tel) => (
                    <PhoneRecord key={tel} phone={tel} />
                ))}
            </Paragpaph>
            <Paragpaph icon="clock-outline" title={subheadersLocale.schedule}>
                {location.schedules.map((schedule, index) => (
                    <Schedule key={index} value={schedule} index={index} />
                ))}
            </Paragpaph>
            <Paragpaph icon="chair-rolling" title={subheadersLocale.services}>
                <View style={styles.servicesContainer}>
                    {Array.from(
                        localMasters.reduce((result, master) => {
                            master.services.forEach((service) => result.add(service))
                            return result
                        }, new Set<Service>()),
                    ).map((service) => (
                        <ServiceChip type={service} key={service} />
                    ))}
                </View>
            </Paragpaph>
            <Paragpaph icon="account-group-outline" title={menuLocale[Tab.Masters]}>
                <View style={styles.pContent}>
                    {localMasters.map((master) => (
                        <MasterItem master={master} key={master.id} />
                    ))}
                </View>
            </Paragpaph>
            {/*<Paragpaph icon="list-status" title="Feedbacks">*/}
            <Paragpaph icon="comment-text-multiple-outline" title={subheadersLocale.feedbacks}>
                <View style={styles.pContent}>
                    {location.feedbacks.map((feedback) => (
                        <FeedbackEntry key={feedback.id} feedback={feedback} />
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
    gallery: {
        width: Dimensions.get('window').width,
        height: 250,
    },
    favouriteButton: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 160,
        left: 250,
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'red',
    },
    serviceChip: {
        marginTop: 4,
        marginRight: 8,
        padding: 0,
    },
    pContent: { marginLeft: -50, width: Dimensions.get('screen').width },
})
