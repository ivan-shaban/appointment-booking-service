import { MessageFormatElement } from 'react-intl'

export const languages = ['en', 'ru', 'ge'] as const
export type Language = typeof languages[number]

const translations = languages.reduce((result, language) => {
    result[language] = {}
    return result
}, {} as Record<Language, Record<string, string> | Record<string, MessageFormatElement[]> | undefined>)

export const getCurrentTranslation = (locale: string) => {
    const language = locale.split(/[-_]/)[0] as Language
    const messages = translations[language] ?? translations['en'] //fallback
    return messages
}
