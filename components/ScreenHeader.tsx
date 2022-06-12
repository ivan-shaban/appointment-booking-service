import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import * as React from 'react'
import { FC } from 'react'

import { Profile } from './Header/Profile'
import { Root } from './Header/Root'

export const ScreenHeader: FC<NativeStackHeaderProps> = (props) => {
    const { options, back, navigation, route } = props
    // console.log(`>> header`, navigation.canGoBack(), back, options)
    // console.log(`>> header > route`, route)

    switch (route.name) {
        case 'Root': {
            return <Root {...props} />
        }
        case 'MasterProfile': {
            return <Profile {...props} />
        }
        default: {
            console.log(`>> no header for this view: ${route.name}`)
            return null
        }
    }
}
