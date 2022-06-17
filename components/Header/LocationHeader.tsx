import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { FC, useCallback } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import { $locations } from '../../store/locations'
import { $currentUser, addFavouriteLocationFx, removeFavouriteLocationFx } from '../../store/user'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

export interface Props extends NativeStackHeaderProps {}

export const LocationHeader: FC<Props> = ({ options, back, navigation, route }) => {
    const currentUser = useStore($currentUser)
    const locations = useStore($locations)
    // @ts-ignore
    const location = locations.find(({ id }) => id === route.params.id)!
    const isFavourite = currentUser?.favourite.locations.includes(location.id)
    const handleFavouritePress = useCallback(() => {
        isFavourite ? removeFavouriteLocationFx(location.id) : addFavouriteLocationFx(location.id)
    }, [location, isFavourite])

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title={location.name} subtitle={location.address} />
            <Appbar.Action
                icon={isFavourite ? 'cards-heart' : 'cards-heart-outline'}
                style={styles.menu}
                color="red"
                onPress={handleFavouritePress}
            />
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: {},
    menu: {
        marginLeft: 'auto',
    },
})
