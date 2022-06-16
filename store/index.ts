import { requestAllLocationsData } from './locations'
import { requestInitialData, requestPermissions } from './main'
import { requestAllMastersData } from './masters'
import { requestPhoneCallPermissionFx } from './permissions'
import { requestUserDataFx } from './user'
import { combine, sample } from 'effector'

let isInitialDataStarted = false
export const $isInitialDataLoaded = combine(
    requestUserDataFx.pending,
    requestAllMastersData.pending,
    requestAllLocationsData.pending,
    (...args) => {
        const isRequestsPending = args.some((flag) => flag)
        if (isRequestsPending) {
            isInitialDataStarted = true
        }
        return isInitialDataStarted && !isRequestsPending
    },
)

// load initial data
sample({
    source: requestInitialData,
    target: [requestUserDataFx, requestAllMastersData, requestAllLocationsData],
})

sample({
    source: requestPermissions,
    target: [requestPhoneCallPermissionFx],
})
