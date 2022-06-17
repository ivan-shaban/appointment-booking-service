import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useStore } from 'effector-react'
import React, { FC, useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'

import { $language, changeLanguage, languages } from '../../store/locale'

export interface Props extends NativeStackHeaderProps {}

export const RootHeader: FC<Props> = ({ navigation }) => {
    const language = useStore($language)
    const handleChangeLanguage = useCallback(() => {
        const nextLangIndex = (languages.indexOf(language) + 1) % languages.length
        changeLanguage(languages[nextLangIndex])
    }, [language])

    return (
        <Appbar.Header style={styles.base}>
            <Appbar.Action icon="menu" onPress={() => {}} />
            <Appbar.Action icon="magnify" style={styles.magnify} onPress={() => {}} />
            <Appbar.Action icon="bell" onPress={() => {}} />
            <TouchableOpacity onPress={handleChangeLanguage}>
                <Avatar.Image
                    size={40}
                    source={{
                        uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
                    }}
                />
            </TouchableOpacity>
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    base: {
        paddingHorizontal: 16,
    },
    magnify: {
        marginLeft: 'auto',
        marginRight: -5,
    },
})
