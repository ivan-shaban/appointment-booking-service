import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { FC, memo, useCallback } from 'react'
import { Dimensions, GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Divider, Headline, Text } from 'react-native-paper'

import { Location, locations } from '../datas/locations'
import { Master } from '../datas/masters'

export interface Props {
    readonly location: Location
}

export const LocationItem: FC<Props> = memo(function MasterItem({ location }) {
    const navigation = useNavigation()

    const handleOpenProfile = useCallback(() => {
        // navigation.navigate('MasterProfile', { id: master.id })
    }, [location])

    const handleAddToFavourites = useCallback(
        (event: GestureResponderEvent) => {
            event.stopPropagation()
            console.log(`>> favourite ${location.address}!`)
        },
        [location],
    )

    return (
        <>
            <TouchableOpacity onPress={handleOpenProfile}>
                <View style={styles.base}>
                    <View>
                        <Headline>{location.address}</Headline>
                        {/*<Text>{location?.address}</Text>*/}
                    </View>
                    {location.isFavourite && (
                        <TouchableOpacity style={styles.favourite} onPress={handleAddToFavourites}>
                            <MaterialCommunityIcons
                                size={24}
                                name="cards-heart-outline"
                                color={'white'}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>
            <Divider />
        </>
    )
})

const styles = StyleSheet.create({
    base: {
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
