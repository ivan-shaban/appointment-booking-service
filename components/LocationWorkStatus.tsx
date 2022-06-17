import React, { FC, memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { locales } from '../locales/masters'
import { Location } from '../store/locations'
import moment from 'moment'

export interface Props {
    readonly location: Location
}

export const LocationWorkStatus: FC<Props> = memo(function LocationWorkStatus({ location }) {
    const now = moment().local(true)
    const schedule = location.schedules[now.isoWeekday() - 1]
    let dayOffset = 0

    const isOpen =
        schedule !== false &&
        schedule.some(([starts, ends]) => {
            const opening = moment(starts, 'HH:mm:ss')
            const closing = moment(ends, 'HH:mm:ss')
            return now.isBetween(opening, closing)
        })

    let nearestSchedule = schedule
        ? isOpen
            ? schedule.find(([starts, ends]) => {
                  const opening = moment(starts, 'HH:mm:ss')
                  const closing = moment(ends, 'HH:mm:ss')
                  return now.isBetween(opening, closing)
              })
            : schedule.find(([starts]) => {
                  const opening = moment(starts, 'HH:mm:ss')
                  return now.isSameOrBefore(opening)
              })
        : null

    while (!nearestSchedule) {
        dayOffset++
        const nextSchedule = location.schedules[(now.isoWeekday() - 1 + dayOffset) % 7]
        nearestSchedule = nextSchedule ? nextSchedule[0] : null
    }
    const nearestOpeningDayIndex = dayOffset
        ? now.clone().add(dayOffset, 'd').isoWeekday() - 1
        : null
    const nearestOpeningDay =
        dayOffset === 1
            ? ` ${locales.tomorrow.toLowerCase()}`
            : nearestOpeningDayIndex !== null &&
              // @ts-ignore
              ` в ${locales[`day${nearestOpeningDayIndex}`].toLowerCase()}`

    return (
        <View style={styles.base}>
            {schedule === false ? (
                <Text>
                    <Text style={styles.closed}>Выходной</Text> • Откроется
                    {nearestOpeningDay} в {nearestSchedule[0]}
                </Text>
            ) : isOpen ? (
                <Text>
                    <Text style={styles.openned}>Открыто</Text> • Закроется в {nearestSchedule[1]}
                </Text>
            ) : (
                <Text>
                    <Text style={styles.closed}>Закрыто</Text> • Откроется
                    {nearestOpeningDay} в {nearestSchedule[0]}
                </Text>
            )}
        </View>
    )
})

const styles = StyleSheet.create({
    base: {
        marginBottom: 4,
    },
    openned: {
        color: 'green',
    },
    closed: {
        color: 'red',
    },
})
