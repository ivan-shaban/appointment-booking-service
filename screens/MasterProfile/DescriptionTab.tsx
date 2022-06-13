import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import React, { FC } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Chip, Paragraph, Subheading } from 'react-native-paper'

import { ClientType } from '../../constants/genders'
import { locales } from '../../locales/masters'
import { MasterProfileTabParamList } from '../../types'

export interface Props
    extends MaterialTopTabScreenProps<MasterProfileTabParamList, 'Description'> {}

export const DescriptionTab: FC<Props> = function Description({ route }) {
    const { master } = route.params

    return (
        <ScrollView style={styles.base}>
            <Paragraph>{master.description}</Paragraph>
            <Subheading style={styles.subtitle}>Мастер работает с:</Subheading>
            <View style={styles.worksWithChips}>
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
                            styles.chip,
                            type === ClientType.Female || type === ClientType.FemaleChild
                                ? styles.chipFemale
                                : styles.chipMale,
                        ]}
                        key={type}
                    >
                        {locales[type]}
                    </Chip>
                ))}
            </View>
            <Subheading style={styles.subtitle}>Локация:</Subheading>
            <Subheading style={styles.subtitle}>Услуги:</Subheading>
            <Subheading style={styles.subtitle}>Цены:</Subheading>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        padding: 16,
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
    worksWithChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'red',
    },
    chip: {
        marginTop: 8,
        marginRight: 8,
        height: 36,
    },
    chipMale: {
        backgroundColor: '#00c5ff',
    },
    chipFemale: {
        backgroundColor: 'rgba(255,0,243,0.52)',
    },
})
