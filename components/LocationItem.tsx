import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useStore } from 'effector-react'
import React, { FC, memo, useCallback } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, Badge, Headline, Text } from 'react-native-paper'

import { Location } from '../store/locations'
import { $currentUser } from '../store/user'
import { View } from './Themed'

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

    return (
        <TouchableOpacity onPress={handleOpenDetails}>
            <View style={styles.base}>
                <Avatar.Icon style={styles.avatar} size={40} icon="map-outline" />
                {!!location.feedbacks.length && (
                    <Badge style={styles.feedbackBadge}>{location.feedbacks.length}</Badge>
                )}
                <View>
                    <Headline numberOfLines={1} style={styles.reducedText}>
                        {location.name}
                    </Headline>
                    <Text numberOfLines={1} style={styles.reducedText}>
                        {location.address}
                    </Text>
                </View>
                {isFavouriteLocation && (
                    <MaterialCommunityIcons
                        style={styles.favourite}
                        size={24}
                        name="cards-heart"
                        color="red"
                    />
                )}
            </View>
        </TouchableOpacity>
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
    reducedText: { width: Dimensions.get('screen').width - 85 },
    feedbackBadge: {
        position: 'absolute',
        top: 40,
        left: 45,
        color: 'white',
        backgroundColor: 'red',
    },
    favourite: {
        marginLeft: 'auto',
    },
})
