import faker from '@faker-js/faker'
import shuffle from 'lodash.shuffle'

export const gendersAll = ['male', 'female', 'male-child', 'female-child'] as const
export interface Master {
    readonly id: number
    readonly name: string
    readonly gender: 'male' | 'female'
    readonly avatar?: string
    readonly locationId: number
    readonly isFavourite: boolean
    readonly worksWith: Array<typeof gendersAll[number]>
}

export const masters: Master[] = faker.datatype.array(17).map((_, index) => {
    const gender = Math.random() > 0.6 ? 'male' : 'female'
    const isFavourite = Math.random() > 0.7
    const shuffledGenders = shuffle(gendersAll)

    return {
        id: index,
        name: `${faker.name.firstName(gender)} ${faker.name.lastName(gender)}`,
        gender,
        avatar: faker.image.people(40, 40, true),
        locationId: faker.datatype.number({ min: 0, max: 7 }),
        isFavourite,
        worksWith: faker.datatype
            .array(faker.datatype.number({ min: 1, max: 4 }))
            .map((_, index) => shuffledGenders[index]),
    }
})
