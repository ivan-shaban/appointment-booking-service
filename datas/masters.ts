import { ClientType, allGenders } from '../constants/genders'
import { MasterType } from '../constants/masters'
import faker from '@faker-js/faker'
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
    readonly isFavourite: boolean
    readonly worksWith: ClientType[]
    readonly feedbacks: MasterFeedback[]
}

export const masters: Master[] = faker.datatype.array(17).map((_, index) => {
    const gender = Math.random() > 0.6 ? 'male' : 'female'
    const isFavourite = Math.random() > 0.7
    const shuffledGenders = shuffle(allGenders)

    return {
        id: index,
        name: `${faker.name.firstName(gender)} ${faker.name.lastName(gender)}`,
        type: [allMasterTypes[faker.datatype.number({ min: 0, max: allMasterTypes.length - 1 })]],
        shortDescription: faker.random.words(5),
        description: faker.random.words(20),
        gender,
        avatar: `https://randomuser.me/api/portraits/${gender === 'male' ? 'men' : 'women'}/${
            index + 1
        }.jpg`,
        locationId: faker.datatype.number({ min: 0, max: 7 }),
        isFavourite,
        worksWith: faker.datatype
            .array(faker.datatype.number({ min: 1, max: 4 }))
            .map((_, index) => shuffledGenders[index]),
        feedbacks: faker.datatype
            .array(faker.datatype.number({ min: 0, max: 100 }))
            .map(() => ({})),
    }
})
