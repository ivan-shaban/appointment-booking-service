import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper'

import { locations } from '../../datas/locations'
import { RootStackScreenProps } from '../../types'

export function LocationProfile({ navigation, route }: RootStackScreenProps<'LocationProfile'>) {
    const location = locations.find(({ id }) => id === route.params.id)!
    // const [fabOpen, setFabOpen] = useState(false)
    //
    // const onStateChange = ({ open }) => setFabOpen(open)

    return (
        <View style={styles.base}>
            <View style={styles.header}>
                {/*<IconButton*/}
                {/*    style={styles.favouriteButton}*/}
                {/*    icon={location.isFavourite ? 'cards-heart' : 'cards-heart-outline'}*/}
                {/*    color={colorByTab[Tab.Favourite]}*/}
                {/*    size={40}*/}
                {/*    onPress={() => console.log('Favourite Pressed')}*/}
                {/*/>*/}
                <Title>{location.name}</Title>
            </View>
            {/*<TabsTop.Navigator initialRouteName="Description">*/}
            {/*    <TabsTop.Screen*/}
            {/*        name="Description"*/}
            {/*        component={DescriptionTab}*/}
            {/*        options={{ title: 'Профиль' }}*/}
            {/*        initialParams={{ master }}*/}
            {/*    />*/}
            {/*    <TabsTop.Screen*/}
            {/*        name="Feedbacks"*/}
            {/*        component={FeedbacksTab}*/}
            {/*        options={{*/}
            {/*            tabBarLabel: 'Отзывы',*/}
            {/*            tabBarBadge: () =>*/}
            {/*                !!master.feedbacks.length && (*/}
            {/*                    <Badge style={styles.feedbackBadge}>*/}
            {/*                        {master.feedbacks.length}*/}
            {/*                    </Badge>*/}
            {/*                ),*/}
            {/*        }}*/}
            {/*        initialParams={{ master }}*/}
            {/*    />*/}
            {/*</TabsTop.Navigator>*/}
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
