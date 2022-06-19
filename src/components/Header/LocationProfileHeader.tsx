import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

import { useLocation } from '../../hooks/useLocation'
import {
    $currentUser,
    $isFavouriteLocationRequestPending,
    addFavouriteLocationFx,
    removeFavouriteLocationFx,
} from '../../store/user'
import { RootStackScreenProps } from '../../types'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

export const LocationProfileHeader = ({
    navigation,
    route,
}: RootStackScreenProps<'LocationProfile'>) => {
    const currentUser = useStore($currentUser)
    const isFavouriteLocationRequestPending = useStore($isFavouriteLocationRequestPending)
    const location = useLocation(route.params.id)
    const isFavourite = currentUser?.favourite.locations.includes(location.id)
    const handleFavouritePress = useCallback(() => {
        isFavourite ? removeFavouriteLocationFx(location.id) : addFavouriteLocationFx(location.id)
    }, [location, isFavourite])

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content title={location.name} subtitle={location.address} />
            <Appbar.Action
                style={styles.bigItem}
                icon={isFavourite ? 'cards-heart' : 'cards-heart-outline'}
                color="red"
                disabled={isFavouriteLocationRequestPending}
                onPress={handleFavouritePress}
            />
            <Appbar.Action style={styles.smallItem} icon="share-variant" onPress={() => {}} />
            <Appbar.Action style={styles.smallItem} icon={MORE_ICON} onPress={() => {}} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: {},
    bigItem: {
        marginLeft: 'auto',
    },
    smallItem: {
        marginLeft: -5,
    },
})
