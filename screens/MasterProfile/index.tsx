import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Badge, FAB, IconButton, Title } from 'react-native-paper'

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

export function MasterProfile({ navigation, route }: RootStackScreenProps<'MasterProfile'>) {
    const master = masters.find(({ id }) => id === route.params.id)!
    const [fabOpen, setFabOpen] = useState(false)

    const onStateChange = ({ open }) => setFabOpen(open)

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
                    style={styles.favouriteButton}
                    icon="cards-heart-outline"
                    color={colorByTab[Tab.Favourite]}
                    size={40}
                    onPress={() => console.log('Favourite Pressed')}
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
                    options={{
                        tabBarLabel: 'Отзывы',
                        tabBarBadge: () =>
                            !!master.feedbacks.length && (
                                <Badge style={styles.feedbackBadge}>
                                    {master.feedbacks.length}
                                </Badge>
                            ),
                    }}
                    initialParams={{ master }}
                />
            </TabsTop.Navigator>
            <FAB.Group
                open={fabOpen}
                icon={fabOpen ? 'arrow-left-circle' : 'plus'}
                color={fabOpen ? 'white' : colorByTab[Tab.Masters]}
                actions={[
                    {
                        icon: 'calendar-today',
                        label: 'Записаться на ближайшее время',
                        onPress: () => console.log('Pressed star'),
                    },
                    {
                        icon: 'calendar-search',
                        label: 'Записаться на определенную дату',
                        onPress: () => console.log('Pressed email'),
                    },
                    {
                        icon: 'calendar-remove',
                        label: 'Отменить запись',
                        onPress: () => console.log('Pressed email'),
                    },
                    // {
                    //     icon: 'bell',
                    //     label: 'Remind',
                    //     onPress: () => console.log('Pressed notifications'),
                    //     small: false,
                    // },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (fabOpen) {
                        // do something if the speed dial is open
                    }
                }}
            />
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
    feedbackBadge: {
        marginTop: 5,
        marginRight: 50,
    },
    favouriteButton: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 160,
        left: 250,
    },
})
