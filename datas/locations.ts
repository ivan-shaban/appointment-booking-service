import { ClientType, allGenders } from '../constants/genders'
import faker from '@faker-js/faker'
import shuffle from 'lodash.shuffle'

export interface LocationFeedback {}

export interface Location {
    readonly id: number
    readonly name: string
    readonly address: string
    readonly worksWith: ClientType[]
    readonly isFavourite: boolean
    readonly lat: number
    readonly lng: number
    readonly tel: string
    readonly feedbacks: LocationFeedback[]
    /**
     * 7 days, max 3 breaks per day
     */
    readonly schedules: Array<Array<[string, string]> | false>
}

export const locations: Location[] = faker.datatype.array(8).map((_, index) => {
    const gender = Math.random() > 0.6 ? 'male' : 'female'
    const isFavourite = Math.random() > 0.7
    const shuffledGenders = shuffle(allGenders)

    return {
        id: index,
        name: faker.company.companyName(),
        address: faker.address.streetAddress(true),
        lat: 0,
        lng: 0,
        tel: faker.phone.phoneNumber('+375 29 ### ## ##'),
        avatar: `https://randomuser.me/api/portraits/${gender === 'male' ? 'men' : 'women'}/${
            index + 1
        }.jpg`,
        isFavourite,
        worksWith: faker.datatype
            .array(faker.datatype.number({ min: 1, max: 4 }))
            .map((_, index) => shuffledGenders[index]),
        schedules: [],
        feedbacks: faker.datatype
            .array(faker.datatype.number({ min: 0, max: 100 }))
            .map(() => ({})),
    }
})
