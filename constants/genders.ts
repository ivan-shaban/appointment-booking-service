export enum ClientType {
    Male = 'male',
    Female = 'female',
    MaleChild = 'malechild',
    FemaleChild = 'femalechild',
}

export const allGenders = [
    ClientType.Male,
    ClientType.Female,
    ClientType.MaleChild,
    ClientType.FemaleChild,
] as const
