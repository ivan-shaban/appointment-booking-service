import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { StyleSheet } from 'react-native'
import { Badge, FAB } from 'react-native-paper'

import { View } from '../../components/Themed'
import { Tab } from '../../constants/Tab'
import { actionsLocale } from '../../locales/actions'
import { menuLocale } from '../../locales/menu'
import { subheadersLocale } from '../../locales/subheaders'
import { $masters } from '../../store/masters'
import { MasterProfileTabParamList, RootStackScreenProps } from '../../types'
import { DescriptionTab } from './DescriptionTab'
import { FeedbacksTab } from './FeedbacksTab'

const TabsTop = createMaterialTopTabNavigator<MasterProfileTabParamList>()

export function MasterProfile({ navigation, route }: RootStackScreenProps<'MasterProfile'>) {
    const intl = useIntl()
    const masters = useStore($masters)
    const master = masters.find(({ id }) => id === route.params.id)!
    const [fabOpen, setFabOpen] = useState(false)

    const onStateChange = ({ open }: { open: boolean }) => setFabOpen(open)

    return (
        <View style={styles.base}>
            <TabsTop.Navigator initialRouteName="Description" tabBarPosition="bottom">
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
                style={styles.fab}
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
    fab: {
        position: 'absolute',
        bottom: 48,
        right: 0,
    },
})
