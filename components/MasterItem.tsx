import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC, memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Dimensions } from 'react-native'
import { Avatar, Divider, Headline, Text } from 'react-native-paper'

import { Master } from '../datas/masters'

export interface Props {
    readonly master: Master
}

const screenWidth = Dimensions.get('window').width
export const MasterItem: FC<Props> = memo(function MasterItem({ master }) {
    return (
        <>
            <TouchableOpacity
                onPress={(event) => {
                    console.log(`>> click on ${master.name}`)
                }}
            >
                <View style={styles.base}>
                    <Avatar.Image
                        style={styles.avatar}
                        size={40}
                        source={{
                            uri: 'https://loremflickr.com/cache/resized/65535_51934925120_107ebd04ff_s_40_40_nofilter.jpg',
                        }}
                    />
                    <View>
                        <Headline>{master.name}</Headline>
                        <Text>Лермонтова 23А</Text>
                    </View>
                    {master.isFavourite && (
                        <MaterialCommunityIcons
                            style={styles.favourite}
                            size={24}
                            name="cards-heart"
                        />
                    )}
                </View>
            </TouchableOpacity>
            <Divider />
        </>
    )
})

const styles = StyleSheet.create({
    base: {
        width: screenWidth,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        // backgroundColor: 'powderblue',
    },
    avatar: {
        marginRight: 16,
    },
    favourite: {
        marginLeft: 'auto',
    },
})
