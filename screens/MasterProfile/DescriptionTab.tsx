import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { Chip, Subheading } from 'react-native-paper'

import { LocationItem } from '../../components/LocationItem'
import { Paragpaph } from '../../components/Paragpaph'
import { ServiceChip } from '../../components/ServiceChip'
import { ClientType } from '../../constants/genders'
import { locales } from '../../locales/masters'
import { $locations } from '../../store/locations'
import { MasterProfileTabParamList } from '../../types'

export interface Props
    extends MaterialTopTabScreenProps<MasterProfileTabParamList, 'Description'> {}

export const DescriptionTab: FC<Props> = function Description({ route }) {
    const { master } = route.params
    const location = useStore($locations).find(({ id }) => id === master.locationId)

    return (
        <ScrollView style={styles.base}>
            <Paragpaph icon="image-text" title="About">
                <Subheading>{master.description}</Subheading>
            </Paragpaph>
            <Paragpaph icon="account-multiple-check-outline" title="Clients">
                <View style={styles.clientsContainer}>
                    {master.worksWith.map((type) => (
                        <Chip
                            icon={
                                type === ClientType.FemaleChild || type === ClientType.MaleChild
                                    ? 'baby-face-outline'
                                    : type === ClientType.Male
                                    ? 'face-man'
                                    : 'face-woman-outline'
                            }
                            style={[
                                styles.clientChip,
                                type === ClientType.Female || type === ClientType.FemaleChild
                                    ? styles.clientChipFemale
                                    : styles.clientChipMale,
                            ]}
                            key={type}
                        >
                            {locales[type]}
                        </Chip>
                    ))}
                </View>
            </Paragpaph>
            <Paragpaph icon="chair-rolling" title="Services">
                <View style={styles.servicesContainer}>
                    {master.services.map((service) => (
                        <ServiceChip type={service} key={service} />
                    ))}
                </View>
            </Paragpaph>
            {location && (
                <Paragpaph icon="map-marker-outline" title="Location">
                    <View style={styles.pContent}>
                        <LocationItem location={location} key={location.id} />
                    </View>
                </Paragpaph>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    subtitle: {
        marginTop: 8,
    },
    clientsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'red',
    },
    clientChip: {
        marginTop: 8,
        marginRight: 8,
    },
    clientChipMale: {
        backgroundColor: '#00c5ff',
    },
    clientChipFemale: {
        backgroundColor: 'rgba(255,0,243,0.52)',
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'red',
    },
    serviceChip: {
        marginTop: 8,
        marginRight: 8,
    },
    pContent: { marginLeft: -50, width: Dimensions.get('screen').width },
})
