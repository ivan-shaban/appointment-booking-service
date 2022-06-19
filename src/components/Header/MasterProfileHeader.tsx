import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'

import { useMaster } from '../../hooks/useMaster'
import { mastersLocale } from '../../locales/masters'
import {
    $currentUser,
    $isFavouriteMasterRequestPending,
    addFavouriteMasterFx,
    removeFavouriteMasterFx,
} from '../../store/user'
import { RootStackScreenProps } from '../../types'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

export const MasterProfileHeader = ({
    navigation,
    route,
}: RootStackScreenProps<'MasterProfile'>) => {
    const intl = useIntl()
    const currentUser = useStore($currentUser)
    const isFavouriteMasterRequestPending = useStore($isFavouriteMasterRequestPending)
    const master = useMaster(route.params.id)
    const isFavourite = currentUser?.favourite.masters.includes(master.id)
    const handleFavouritePress = useCallback(() => {
        isFavourite ? removeFavouriteMasterFx(master.id) : addFavouriteMasterFx(master.id)
    }, [master, isFavourite])

    const handleOpenMasterPhotoModal = useCallback(() => {
        navigation.navigate('MasterPhotoModal', {
            master,
        })
    }, [master, navigation])

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <TouchableOpacity onPress={handleOpenMasterPhotoModal}>
                <Avatar.Image
                    size={40}
                    source={{
                        uri: master.avatar,
                    }}
                />
            </TouchableOpacity>
            <Appbar.Content
                title={master.name}
                subtitle={master.type
                    .map((type) => intl.formatMessage(mastersLocale[type]))
                    .join(', ')}
            />
            <Appbar.Action
                style={styles.bigItem}
                icon={isFavourite ? 'cards-heart' : 'cards-heart-outline'}
                color="red"
                disabled={isFavouriteMasterRequestPending}
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
