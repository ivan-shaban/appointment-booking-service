import { ClientType, allGenders } from '../constants/genders'
import { MasterType } from '../constants/masters'
import { HairServices } from '../constants/services'
import { delay } from '../utils/time'
import faker from '@faker-js/faker'
import { createEffect, createStore } from 'effector'
import shuffle from 'lodash.shuffle'

export const allMasterTypes = [
    MasterType.Hairdresser,
    MasterType.Stylist,
    MasterType.Masseur,
    MasterType.Podiatrist,
    MasterType.NailsMaster,
    MasterType.Beautician,
    MasterType.Cosmetic,
] as const

export interface MasterFeedback {}

export interface Master {
    readonly id: number
    readonly name: string
    readonly type: MasterType[]
    readonly shortDescription: string
    readonly description: string
    readonly gender: 'male' | 'female'
    readonly avatar?: string
    readonly locationId: number
    readonly services: HairServices[]
    readonly worksWith: ClientType[]
    readonly feedbacks: MasterFeedback[]
}

export const requestAllMastersData = createEffect({
    name: 'request all masters',
    handler: async () => {
        await delay(500)

        return faker.datatype.array(17).map((_, index): Master => {
            const gender = Math.random() > 0.6 ? 'male' : 'female'
            const shuffledGenders = shuffle(allGenders)
            const shuffledServices = shuffle(Object.values(HairServices))

            return {
                id: index,
                name: `${faker.name.firstName(gender)} ${faker.name.lastName(gender)}`,
                type: [
                    allMasterTypes[
                        faker.datatype.number({ min: 0, max: allMasterTypes.length - 1 })
                    ],
                ],
                shortDescription: faker.random.words(5),
                description: faker.random.words(20),
                gender,
                avatar: `https://randomuser.me/api/portraits/${
                    gender === 'male' ? 'men' : 'women'
                }/${index + 1}.jpg`,
                locationId: faker.datatype.number({ min: 0, max: 7 }),
                services: faker.datatype
                    .array(faker.datatype.number({ min: 1, max: shuffledServices.length - 1 }))
                    .map((_, index) => shuffledServices[index]),
                worksWith: faker.datatype
                    .array(faker.datatype.number({ min: 1, max: 4 }))
                    .map((_, index) => shuffledGenders[index]),
                feedbacks: faker.datatype
                    .array(faker.datatype.number({ min: 0, max: 100 }))
                    .map(() => ({})),
            }
        })
    },
})

export const $masters = createStore<Master[]>([]).on(
    requestAllMastersData.doneData,
    (_, data) => data,
)
