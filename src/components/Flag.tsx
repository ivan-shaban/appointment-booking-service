import { useStore } from 'effector-react'
import React, { FC, memo, useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-ico-flags'

import { $language, Language, changeLanguage } from '../store/locale'

export interface Props {
    language: Language
}

export const Flag: FC<Props> = memo(function Flag({ language }) {
    const lang = useStore($language)
    const handlePress = useCallback(() => {
        changeLanguage(language)
    }, [language])

    return (
        <TouchableOpacity onPress={handlePress}>
            <Icon
                style={styles.icon}
                name={
                    language === 'ru'
                        ? 'russia'
                        : language === 'ge'
                        ? 'georgia'
                        : 'united-states-of-america'
                }
                width={lang === language ? 30 : 20}
                height={lang === language ? 30 : 20}
            />
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 8,
    },
})
