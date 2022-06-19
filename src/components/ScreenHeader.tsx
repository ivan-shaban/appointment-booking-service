import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import * as React from 'react'
import { FC } from 'react'

import { LocationProfileHeader } from './Header/LocationProfileHeader'
import { MasterProfileHeader } from './Header/MasterProfileHeader'
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
            return <MasterProfileHeader {...props} />
        }
        case 'LocationProfile': {
            return <LocationProfileHeader {...props} />
        }
        case 'MasterPhotoModal': {
            return null
        }
        default: {
            console.log(`>> no header for this view: ${route.name}`)
            return null
        }
    }
}
