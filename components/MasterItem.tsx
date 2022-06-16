import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useStore } from 'effector-react'
import React, { FC, memo, useCallback } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Badge, Headline, Text } from 'react-native-paper'

import { locales } from '../locales/masters'
import { Master } from '../store/masters'
import { $currentUser } from '../store/user'
import { View as ThemedView } from './Themed'

export interface Props {
    readonly master: Master
}

export const MasterItem: FC<Props> = memo(function MasterItem({ master }) {
    const navigation = useNavigation()
    const currentUser = useStore($currentUser)
    const isFavouriteMaster = currentUser?.favourite.masters.includes(master.id)

    const handleOpenProfile = useCallback(() => {
        navigation.navigate('MasterProfile', {
            id: master.id,
            screen: 'Description',
            params: { master },
        })
    }, [master])

    return (
        <TouchableOpacity onPress={handleOpenProfile}>
            <ThemedView style={styles.base}>
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
                    <Headline numberOfLines={1} style={styles.reducedText}>
                        {master.name}
                    </Headline>
                    <Text>{master.type.map((type) => locales[type]).join(', ')}</Text>
                </View>
                {isFavouriteMaster && (
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
