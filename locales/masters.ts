import { ClientType } from '../constants/genders'
import { MasterType } from '../constants/masters'

export const locales = {
    [MasterType.Hairdresser]: 'Парикмахер',
    [MasterType.Stylist]: 'Косметолог',
    [MasterType.Masseur]: 'Масажист',
    [MasterType.Podiatrist]: 'Подолог',
    [MasterType.NailsMaster]: 'Маникюрист',
    [MasterType.Beautician]: 'Косметолог',
    [MasterType.Cosmetic]: 'Косметик',
    [ClientType.Male]: 'Мужчины',
    [ClientType.Female]: 'Женщины',
    [ClientType.MaleChild]: 'Мальчики',
    [ClientType.FemaleChild]: 'Девочки',
}
