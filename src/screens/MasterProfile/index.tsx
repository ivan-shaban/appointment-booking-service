import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useStore } from 'effector-react'
import React, { useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import { StyleSheet } from 'react-native'
import { Avatar, Badge, FAB, IconButton, Title } from 'react-native-paper'

import { View } from '../../components/Themed'
import { colorByTab } from '../../constants/Colors'
import { Tab } from '../../constants/Tab'
import { actionsLocale } from '../../locales/actions'
import { menuLocale } from '../../locales/menu'
import { subheadersLocale } from '../../locales/subheaders'
import { $masters } from '../../store/masters'
import {
    $currentUser,
    $isFavouriteMasterRequestPending,
    addFavouriteMasterFx,
    removeFavouriteMasterFx,
} from '../../store/user'
import { MasterProfileTabParamList, RootStackScreenProps } from '../../types'
import { DescriptionTab } from './DescriptionTab'
import { FeedbacksTab } from './FeedbacksTab'

const TabsTop = createMaterialTopTabNavigator<MasterProfileTabParamList>()

export function MasterProfile({ navigation, route }: RootStackScreenProps<'MasterProfile'>) {
    const intl = useIntl()
    const currentUser = useStore($currentUser)
    const isFavouriteMasterRequestPending = useStore($isFavouriteMasterRequestPending)
    const masters = useStore($masters)
    const master = masters.find(({ id }) => id === route.params.id)!
    const isFavouriteMaster = currentUser?.favourite.masters.includes(master.id)
    const [fabOpen, setFabOpen] = useState(false)

    const onStateChange = ({ open }: { open: boolean }) => setFabOpen(open)
    const handleFavouritePress = useCallback(() => {
        isFavouriteMaster ? removeFavouriteMasterFx(master.id) : addFavouriteMasterFx(master.id)
    }, [master, isFavouriteMaster])

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
                    icon={isFavouriteMaster ? 'cards-heart' : 'cards-heart-outline'}
                    color={colorByTab[Tab.Favourite]}
                    size={40}
                    disabled={isFavouriteMasterRequestPending}
                    onPress={handleFavouritePress}
                />
                <Title>{master.name}</Title>
            </View>
            <TabsTop.Navigator initialRouteName="Description">
                <TabsTop.Screen
                    name="Description"
                    component={DescriptionTab}
                    options={{ title: intl.formatMessage(menuLocale[Tab.Profile]) }}
                    initialParams={{ master }}
                />
                <TabsTop.Screen
                    name="Feedbacks"
                    component={FeedbacksTab}
                    options={{
                        tabBarLabel: intl.formatMessage(subheadersLocale.feedbacks),
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
                color="white"
                actions={[
                    {
                        icon: 'calendar-today',
                        label: intl.formatMessage(actionsLocale.signUpSoon),
                        onPress: () => console.log('Pressed star'),
                    },
                    {
                        icon: 'calendar-search',
                        label: intl.formatMessage(actionsLocale.signUpAtDate),
                        onPress: () => console.log('Pressed email'),
                    },
                    {
                        icon: 'calendar-remove',
                        label: intl.formatMessage(actionsLocale.cancelRecord),
                        onPress: () => console.log('Pressed email'),
                    },
                    {
                        icon: 'comment-plus-outline',
                        // icon: 'comment-text',
                        label: intl.formatMessage(actionsLocale.leftFeedback),
                        onPress: () => console.log('Pressed email'),
                    },
                    {
                        icon: 'forum',
                        label: intl.formatMessage(actionsLocale.sendMessage),
                        onPress: () => console.log('Pressed email'),
                    },
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
        alignItems: 'center',
        paddingTop: 20,
    },
    avatar: {
        marginBottom: 8,
    },
    feedbackBadge: {
        marginTop: 5,
        marginRight: 50,
        color: 'white',
        backgroundColor: 'red',
    },
    favouriteButton: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 160,
        left: 250,
    },
})
