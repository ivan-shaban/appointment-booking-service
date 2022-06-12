export enum ClientType {
    Male,
    Female,
    MaleChild,
    FemaleChild,
}

export const allGenders = [
    ClientType.Male,
    ClientType.Female,
    ClientType.MaleChild,
    ClientType.FemaleChild,
] as const
