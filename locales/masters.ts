import { ClientType } from '../constants/genders'
import { MasterType } from '../constants/masters'
import { HairServices } from '../constants/services'

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

    [HairServices.haircut_man]: 'Мужская стрижка',
    [HairServices.haircut_woman]: 'Женская стрижка',
    [HairServices.haircut_child]: 'Детская стрижка',
    [HairServices.coloring_melirovanie]: 'Окрашивание: мелирование',
    [HairServices.coloring_shatush]: 'Окрашивание: шатуш',
    [HairServices.coloring_balayaj]: 'Окрашивание: балаяж',
    [HairServices.coloring_airtouch]: 'Окрашивание: аиртач',
    [HairServices.cure_laminirovanie]: 'Лечение волос: ламинирование',
    [HairServices.cure_ekranirovanie]: 'Лечение волос: экранирование',
    [HairServices.cure_glazirovanie]: 'Лечение волос: глазирование',
    [HairServices.straightening]: 'Выпрямление',
    [HairServices.hairstyle]: 'Прическа',
    [HairServices.styling_for_event]: 'Укладка: торжественная',
    [HairServices.styling_daily]: 'Укладка: ежедневная',
}
