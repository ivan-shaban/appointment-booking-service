import {
    MaterialTopTabBarProps,
    MaterialTopTabNavigationEventMap,
    createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs'
import { MaterialTopTabDescriptorMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types'
import {
    NavigationContainer,
    NavigationHelpers,
    ParamListBase,
    TabNavigationState,
} from '@react-navigation/native'
import React from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, IconButton, Text, Title } from 'react-native-paper'

import { colorByTab } from '../../constants/Colors'
import { Tab } from '../../constants/Tab'
import { Master, masters } from '../../datas/masters'
import { RootStackScreenProps } from '../../types'
import { DescriptionTab } from './DescriptionTab'
import { FeedbacksTab } from './FeedbacksTab'

const TabsTop = createMaterialTopTabNavigator<{
    Description: { master: Master }
    Feedbacks: { master: Master }
}>()

// export function MyTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
//     // console.log(`>> routes`, state.routes)
//     // console.log(`>> descriptors`, descriptors)
//     return (
//         <View style={{ flexDirection: 'row' }}>
//             {state.routes.map((route, index) => {
//                 const { options } = descriptors[route.key]
//                 const label =
//                     options.tabBarLabel !== undefined
//                         ? options.tabBarLabel
//                         : options.title !== undefined
//                         ? options.title
//                         : route.name
//
//                 const isFocused = state.index === index
//
//                 const onPress = () => {
//                     const event = navigation.emit({
//                         type: 'tabPress',
//                         target: route.key,
//                         canPreventDefault: true,
//                     })
//
//                     if (!isFocused && !event.defaultPrevented) {
//                         // The `merge: true` option makes sure that the params inside the tab screen are preserved
//                         navigation.navigate({ name: route.name, merge: true })
//                     }
//                 }
//
//                 const onLongPress = () => {
//                     navigation.emit({
//                         type: 'tabLongPress',
//                         target: route.key,
//                     })
//                 }
//
//                 return (
//                     <TouchableOpacity
//                         key={route.key}
//                         accessibilityRole="button"
//                         accessibilityState={isFocused ? { selected: true } : {}}
//                         accessibilityLabel={options.tabBarAccessibilityLabel}
//                         testID={options.tabBarTestID}
//                         onPress={onPress}
//                         onLongPress={onLongPress}
//                         style={{ flex: 1 }}
//                     >
//                         <Text>{label}</Text>
//                     </TouchableOpacity>
//                 )
//             })}
//         </View>
//     )
// }

export function MasterProfile({ navigation, route }: RootStackScreenProps<'MasterProfile'>) {
    const master = masters.find(({ id }) => id === route.params.id)!

    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <Avatar.Image
                    size={200}
                    style={styles.avatar}
                    source={{
                        uri: master.avatar,
                    }}
                />
                <IconButton
                    style={styles.favourite}
                    icon="cards-heart-outline"
                    color={colorByTab[Tab.Favourite]}
                    size={40}
                    onPress={() => console.log('Pressed')}
                />
                <Title>{master.name}</Title>
            </View>
            <TabsTop.Navigator initialRouteName="Description">
                <TabsTop.Screen
                    name="Description"
                    component={DescriptionTab}
                    options={{ title: 'Профиль' }}
                    initialParams={{ master }}
                />
                <TabsTop.Screen
                    name="Feedbacks"
                    component={FeedbacksTab}
                    options={{ title: 'Отзывы' }}
                    initialParams={{ master }}
                />
            </TabsTop.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    header: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    avatar: {
        marginBottom: 8,
    },
    favourite: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 160,
        left: 250,
    },
})
