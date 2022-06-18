import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import { useStore } from 'effector-react'
import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Chip, Subheading } from 'react-native-paper'

import { LocationItem } from '../../components/LocationItem'
import { Paragpaph } from '../../components/Paragpaph'
import { ServiceChip } from '../../components/ServiceChip'
import { ScrollView } from '../../components/Themed'
import { Tab } from '../../constants/Tab'
import { ClientType } from '../../constants/genders'
import { menuLocale } from '../../locales/menu'
import { subheadersLocale } from '../../locales/subheaders'
import { $locations } from '../../store/locations'
import { MasterProfileTabParamList } from '../../types'

export interface Props
    extends MaterialTopTabScreenProps<MasterProfileTabParamList, 'Description'> {}

export const DescriptionTab: FC<Props> = function Description({ route }) {
    const intl = useIntl()
    const { master } = route.params
    const location = useStore($locations).find(({ id }) => id === master.locationId)

    return (
        <ScrollView style={styles.base}>
            <Paragpaph icon="image-text" title={subheadersLocale.aboutSelf}>
                <Subheading>{master.description}</Subheading>
            </Paragpaph>
            <Paragpaph icon="account-multiple-check-outline" title={subheadersLocale.clients}>
                <View style={styles.clientsContainer}>
                    {master.worksWith.map((type) => (
                        <Chip
                            icon={
                                type === ClientType.Girls || type === ClientType.Boys
                                    ? 'baby-face-outline'
                                    : type === ClientType.Men
                                    ? 'face-man'
                                    : 'face-woman-outline'
                            }
                            style={[
                                styles.clientChip,
                                type === ClientType.Women || type === ClientType.Girls
                                    ? styles.clientChipFemale
                                    : styles.clientChipMale,
                            ]}
                            key={type}
                        >
                            {intl.formatMessage(subheadersLocale[type])}
                        </Chip>
                    ))}
                </View>
            </Paragpaph>
            <Paragpaph icon="chair-rolling" title={subheadersLocale.services}>
                <View style={styles.servicesContainer}>
                    {master.services.map((service) => (
                        <ServiceChip type={service} key={service} />
                    ))}
                </View>
            </Paragpaph>
            {location && (
                <Paragpaph icon="map-marker-outline" title={menuLocale[Tab.Locations]}>
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