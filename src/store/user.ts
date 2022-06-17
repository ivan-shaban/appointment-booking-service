import { delay } from '../utils/time'
import faker from '@faker-js/faker'
import { combine, createEffect, createStore } from 'effector'
import shuffle from 'lodash.shuffle'

export interface CurrentUser {
    readonly favourite: {
        readonly masters: number[]
        readonly locations: number[]
    }
}

export const requestUserDataFx = createEffect({
    name: 'request current user data',
    handler: async (): Promise<CurrentUser> => {
        await delay(500)

        const masterIds = shuffle(faker.datatype.array(17).map((_, index) => index))
        const favouriteMastersCount = faker.datatype.number({
            min: 1,
            max: 6,
        })
        const locationsIds = shuffle(faker.datatype.array(8).map((_, index) => index))
        const favouriteLocationsCount = faker.datatype.number({
            min: 1,
            max: locationsIds.length - 1,
        })

        return {
            favourite: {
                masters: masterIds.filter((_, index) => index <= favouriteMastersCount),
                locations: locationsIds.filter((_, index) => index <= favouriteLocationsCount),
            },
        }
    },
})

export const addFavouriteMasterFx = createEffect({
    name: 'add master to favourite list',
    handler: async (masterId: number) => {
        await delay(500)

        return masterId
    },
})

export const removeFavouriteMasterFx = createEffect({
    name: 'remove master from favourite list',
    handler: async (masterId: number) => {
        await delay(500)

        return masterId
    },
})

export const $isFavouriteMasterRequestPending = combine(
    addFavouriteMasterFx.pending,
    removeFavouriteMasterFx.pending,
    (...args) => args.some((pending) => pending),
)

export const addFavouriteLocationFx = createEffect({
    name: 'add location to favourite list',
    handler: async (locationId: number) => {
        await delay(500)

        return locationId
    },
})

export const removeFavouriteLocationFx = createEffect({
    name: 'remove master from favourite list',
    handler: async (locationId: number) => {
        await delay(500)

        return locationId
    },
})

export const $isFavouriteLocationRequestPending = combine(
    addFavouriteLocationFx.pending,
    removeFavouriteLocationFx.pending,
    (...args) => args.some((pending) => pending),
)

export const $currentUser = createStore<Nullable<CurrentUser>>(null)
    .on(requestUserDataFx.doneData, (_, currentUser) => currentUser)
    .on(addFavouriteMasterFx.doneData, (currentUser, masterId) =>
        currentUser
            ? {
                  ...currentUser,
                  favourite: {
                      ...currentUser.favourite,
                      masters: [...currentUser.favourite.masters, masterId],
                  },
              }
            : null,
    )
    .on(removeFavouriteMasterFx.doneData, (currentUser, masterId) =>
        currentUser
            ? {
                  ...currentUser,
                  favourite: {
                      ...currentUser.favourite,
                      masters: currentUser.favourite.masters.filter((id) => id !== masterId),
                  },
              }
            : null,
    )
    .on(addFavouriteLocationFx.doneData, (currentUser, locationId) =>
        currentUser
            ? {
                  ...currentUser,
                  favourite: {
                      ...currentUser.favourite,
                      locations: [...currentUser.favourite.locations, locationId],
                  },
              }
            : null,
    )
    .on(removeFavouriteLocationFx.doneData, (currentUser, locationId) =>
        currentUser
            ? {
                  ...currentUser,
                  favourite: {
                      ...currentUser.favourite,
                      locations: currentUser.favourite.locations.filter((id) => id !== locationId),
                  },
              }
            : null,
    )
