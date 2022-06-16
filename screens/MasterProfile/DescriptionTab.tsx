import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import React, { FC } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Chip, Subheading } from 'react-native-paper'

import { Paragpaph } from '../../components/Paragpaph'
import { ClientType } from '../../constants/genders'
import { locales } from '../../locales/masters'
import { MasterProfileTabParamList } from '../../types'

export interface Props
    extends MaterialTopTabScreenProps<MasterProfileTabParamList, 'Description'> {}

export const DescriptionTab: FC<Props> = function Description({ route }) {
    const { master } = route.params

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
                        <Chip icon="plus-circle" style={styles.serviceChip} key={service}>
                            {locales[service]}
                        </Chip>
                    ))}
                </View>
            </Paragpaph>
            <Subheading style={styles.subtitle}>Мастер работает с:</Subheading>
            <Subheading style={styles.subtitle}>Локация:</Subheading>
            <Subheading style={styles.subtitle}>Услуги:</Subheading>
            <Subheading style={styles.subtitle}>Цены:</Subheading>
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
})
