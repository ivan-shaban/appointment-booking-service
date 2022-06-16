import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useStore } from 'effector-react'
import React, { FC, memo, useCallback } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Badge, Headline, Text } from 'react-native-paper'

import { colorByTab } from '../constants/Colors'
import { Tab } from '../constants/Tab'
import { Location } from '../store/locations'
import { $masters } from '../store/masters'
import { $currentUser } from '../store/user'
import { View as ThemedView } from './Themed'
import faker from '@faker-js/faker'

export interface Props {
    readonly location: Location
}

export const LocationItem: FC<Props> = memo(function MasterItem({ location }) {
    const currentUser = useStore($currentUser)
    const masters = useStore($masters).filter(({ locationId }) => locationId === location.id)
    const isFavourite = currentUser?.favourite.locations.includes(location.id)
    const navigation = useNavigation()
    const roundedRating = Math.round(location.rating)

    const handleOpenDetails = useCallback(() => {
        navigation.navigate('LocationProfile', { id: location.id })
    }, [location])

    return (
        <TouchableOpacity onPress={handleOpenDetails}>
            <ThemedView style={styles.base}>
                <Avatar.Icon style={styles.avatar} size={40} icon="map-outline" />
                <View style={styles.mastersBadge}>
                    <MaterialCommunityIcons
                        style={styles.mastersBadgeIcon}
                        size={16}
                        name="account-group-outline"
                        color="white"
                    />
                    <Text style={styles.mastersBadgeText}>{masters.length}</Text>
                </View>
                <View>
                    <Headline
                        numberOfLines={1}
                        style={isFavourite ? styles.reducedText__small : styles.reducedText}
                    >
                        {location.name}
                    </Headline>
                    <Text
                        numberOfLines={1}
                        style={isFavourite ? styles.reducedText__small : styles.reducedText}
                    >
                        {location.address}
                    </Text>
                    {location.feedbacks.length ? (
                        <Text>
                            {faker.datatype.array(5).map((_m, index) => (
                                <MaterialCommunityIcons
                                    size={12}
                                    name="star"
                                    color={index + 1 <= roundedRating ? 'gold' : 'white'}
                                    key={index}
                                />
                            ))}
                            {` ${location.rating} (${location.feedbacks.length})`}
                        </Text>
                    ) : (
                        <Text>No rating, be first user!</Text>
                    )}
                </View>
                {isFavourite && (
                    <MaterialCommunityIcons
                        style={styles.favourite}
                        size={24}
                        name="cards-heart"
                        color="red"
                    />
                )}
            </ThemedView>
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
    reducedText__small: { width: Dimensions.get('screen').width - 125 },
    mastersBadge: {
        position: 'absolute',
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        top: 15,
        left: 15,
        color: 'white',
        backgroundColor: colorByTab[Tab.Masters],
    },
    mastersBadgeIcon: {
        marginRight: 4,
    },
    mastersBadgeText: {
        fontSize: 12,
    },
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
