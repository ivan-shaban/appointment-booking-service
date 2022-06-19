import { useStore } from 'effector-react'

import { $locations } from '../store/locations'

export function useLocation(id: number) {
    const locations = useStore($locations)
    return locations.find(({ id: locationId }) => id === locationId)!
}
