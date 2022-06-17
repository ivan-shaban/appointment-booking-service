import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import * as React from 'react'
import { FC } from 'react'

import { LocationHeader } from './Header/LocationHeader'
import { ProfileHeader } from './Header/ProfileHeader'
import { RootHeader } from './Header/RootHeader'

export const ScreenHeader: FC<NativeStackHeaderProps> = (props) => {
    const { options, back, navigation, route } = props
    // console.log(`>> header`, navigation.canGoBack(), back, options)
    // console.log(`>> header > route`, route)

    switch (route.name) {
        case 'Root': {
            return <RootHeader {...props} />
        }
        case 'MasterProfile': {
            return <ProfileHeader {...props} />
        }
        case 'LocationProfile': {
            return <LocationHeader {...props} />
        }
        default: {
            console.log(`>> no header for this view: ${route.name}`)
            return null
        }
    }
}
