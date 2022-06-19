import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { FC, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'

import { mastersLocale } from '../../locales/masters'
import { $masters } from '../../store/masters'
import { $currentUser, addFavouriteMasterFx, removeFavouriteMasterFx } from '../../store/user'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

export interface Props extends NativeStackHeaderProps {}

export const ProfileHeader: FC<Props> = ({ options, back, navigation, route }) => {
    const intl = useIntl()
    const currentUser = useStore($currentUser)
    const masters = useStore($masters)
    // @ts-ignore
    const master = masters.find(({ id }) => id === route!.params!.id)!
    const isFavourite = currentUser?.favourite.masters.includes(master.id)
    const handleFavouritePress = useCallback(() => {
        isFavourite ? removeFavouriteMasterFx(master.id) : addFavouriteMasterFx(master.id)
    }, [master, isFavourite])

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <TouchableOpacity onPress={() => {}}>
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
