import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { FC, memo, useCallback } from 'react'
import { Dimensions, GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Badge, Divider, Headline, Text } from 'react-native-paper'

import { locations } from '../datas/locations'
import { Master } from '../datas/masters'
import { locales } from '../locales/masters'

export interface Props {
    readonly master: Master
}

const screenWidth = Dimensions.get('window').width
export const MasterItem: FC<Props> = memo(function MasterItem({ master }) {
    const navigation = useNavigation()
    const location = locations.find(({ id }) => id === master.locationId)!

    const handleOpenProfile = useCallback(() => {
        navigation.navigate('MasterProfile', { id: master.id, screen: 'Description' })
    }, [master])

    const handleAddToFavourites = useCallback((event: GestureResponderEvent) => {
        event.stopPropagation()
        console.log(`>> favourite ${master.name}!`)
    }, [])

    return (
        <>
            <TouchableOpacity onPress={handleOpenProfile}>
                <View style={styles.base}>
                    <Avatar.Image
                        style={styles.avatar}
                        size={40}
                        source={{
                            uri: master.avatar,
                        }}
                    />
                    {!!master.feedbacks.length && (
                        <Badge style={styles.feedbackBadge}>{master.feedbacks.length}</Badge>
                    )}
                    <View>
                        <Headline>{master.name}</Headline>
                        <Text>{master.type.map((type) => locales[type]).join(', ')}</Text>
                    </View>
                    {master.isFavourite && (
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
    feedbackBadge: {
        position: 'absolute',
        top: 40,
        left: 45,
    },
    favourite: {
        marginLeft: 'auto',
    },
})
