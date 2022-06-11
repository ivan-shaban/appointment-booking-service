import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import * as React from 'react'
import { FC } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

export const ScreenHeader: FC<NativeStackHeaderProps> = ({ options, back, navigation }) => {
    // const { options } = scene.descriptor
    const title = '222'
    console.log(`>> nn`, navigation.canGoBack(), back, options)
    // const title =
    //     options.headerTitle !== undefined
    //         ? options.headerTitle
    //         : options.title !== undefined
    //         ? options.title
    //         : scene.route.name

    return (
        <Appbar.Header>
            {back ? (
                <Appbar.BackAction onPress={navigation.pop} />
            ) : (
                <TouchableOpacity
                    onPress={() => {
                        // navigation.openDrawer()
                    }}
                >
                    <Avatar.Image
                        size={40}
                        source={{
                            uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
                        }}
                    />
                </TouchableOpacity>
            )}
            <Appbar.Content title={title} subtitle="enjoy the greatest hits" />
            <Appbar.Action icon="magnify" onPress={() => {}} />
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
        </Appbar.Header>
    )
}
