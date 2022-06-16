import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useStore } from 'effector-react'
import React, { FC, memo, useCallback } from 'react'
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Badge, Divider, Headline, Text } from 'react-native-paper'

import { Location } from '../store/locations'
import { $currentUser } from '../store/user'

export interface Props {
    readonly location: Location
}

export const LocationItem: FC<Props> = memo(function MasterItem({ location }) {
    const currentUser = useStore($currentUser)
    const isFavouriteLocation = currentUser?.favourite.locations.includes(location.id)
    const navigation = useNavigation()

    const handleOpenDetails = useCallback(() => {
        navigation.navigate('LocationProfile', { id: location.id })
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
            <TouchableOpacity onPress={handleOpenDetails}>
                <View style={styles.base}>
                    <Avatar.Icon style={styles.avatar} size={40} icon="map-outline" />
                    {!!location.feedbacks.length && (
                        <Badge style={styles.feedbackBadge}>{location.feedbacks.length}</Badge>
                    )}
                    <View>
                        <Headline>{location.name}</Headline>
                        <Text>{location.address}</Text>
                    </View>
                    {isFavouriteLocation && (
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
    feedbackBadge: {
        position: 'absolute',
        top: 40,
        left: 45,
    },
    favourite: {
        marginLeft: 'auto',
    },
})
