import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { View as DefaultView, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'

import { Flag } from '../components/Flag'
import { View, useThemeColor } from '../components/Themed'
import { Tab } from '../constants/Tab'
import { RootTabScreenProps } from '../types'

export function ProfileScreen({ navigation }: RootTabScreenProps<Tab.Profile>) {
    const iconColor = useThemeColor({}, 'text')

    return (
        <View style={styles.base}>
            <View style={styles.language}>
                <MaterialCommunityIcons
                    style={styles.icon}
                    name="translate"
                    size={20}
                    color={iconColor}
                />
                <Title>
                    <FormattedMessage id="language" defaultMessage="Язык" />
                </Title>
                <View style={styles.flags}>
                    <Flag language="ru" />
                    <DefaultView style={styles.divider} />
                    <Flag language="ge" />
                    <DefaultView style={styles.divider} />
                    <Flag language="en" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    icon: {
        marginRight: 8,
    },
    language: {
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: 'red',
    },
    flags: {
        marginLeft: 'auto',
        alignItems: 'center',
        flexDirection: 'row',
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: '#ccc',
    },
})
