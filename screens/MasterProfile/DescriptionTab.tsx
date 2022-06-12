import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs/src/types'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Chip, Paragraph } from 'react-native-paper'

import { ClientType } from '../../constants/genders'
import { locales } from '../../locales/masters'
import { MasterProfileTabParamList } from '../../types'

export interface Props
    extends MaterialTopTabScreenProps<MasterProfileTabParamList, 'Description'> {}

export const DescriptionTab: FC<Props> = function Description({ route }) {
    const { master } = route.params
    console.log(`>> master.worksWith`, master.worksWith)
    return (
        <View style={styles.base}>
            <Paragraph>{master.description}</Paragraph>
            <View style={styles.chips}>
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
                            {
                                backgroundColor:
                                    type === ClientType.Female || type === ClientType.FemaleChild
                                        ? 'rgba(255,0,243,0.52)'
                                        : '#00c5ff',
                            },
                        ]}
                        key={type}
                    >
                        {locales[type]}
                    </Chip>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        padding: 16,
    },
    chips: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    chip: {
        marginTop: 8,
        marginRight: 8,
        height: 36,
        // backgroundColor: '#2890af',
    },
})
