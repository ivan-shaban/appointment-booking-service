import { useStore } from 'effector-react'

import { $masters } from '../store/masters'

export function useMaster(id: number) {
    const masters = useStore($masters)
    return masters.find(({ id: masterId }) => id === masterId)!
}
