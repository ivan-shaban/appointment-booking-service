import React, { FC, memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Subheading } from 'react-native-paper'

export const dayLocales = [
    'Понедельник',
    'Вторник',
    'Среды',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
]
export interface Props {
    readonly index: number
    readonly value: Array<[string, string]> | false
}

export const Schedule: FC<Props> = memo(function Schedule({ value, index }) {
    return (
        <View style={styles.base}>
            <Subheading>{dayLocales[index]}</Subheading>
            <View style={styles.hours}>
                {!value ? (
                    <Subheading>Выходной</Subheading>
                ) : (
                    value.map(([start, end]) => (
                        <Subheading key={`${start}-${end}`}>
                            {start}-{end}
                        </Subheading>
                    ))
                )}
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    hours: {},
})
