import React, { FC, memo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { daysLocale } from '../locales/days'
import { Location } from '../store/locations'
import moment from 'moment'

export interface Props {
    readonly location: Location
}

export const LocationWorkStatus: FC<Props> = memo(function LocationWorkStatus({ location }) {
    const intl = useIntl()
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
        nearestOpeningDayIndex !== null &&
        // @ts-ignore
        intl.formatMessage(daysLocale[`day${nearestOpeningDayIndex}`])

    return (
        <View style={styles.base}>
            {schedule === false ? (
                <Text>
                    <Text style={styles.closed}>
                        <FormattedMessage id="day.holiday" />
                    </Text>{' '}
                    {dayOffset === 1 ? (
                        <FormattedMessage
                            id="location.opensTomorrow"
                            defaultMessage="• Откроется завтра в {time}"
                            values={{
                                time: nearestSchedule[0],
                            }}
                        />
                    ) : nearestOpeningDay ? (
                        <FormattedMessage
                            id="location.opensInDay"
                            defaultMessage="• Откроется в {day} в {time}"
                            values={{
                                day: nearestOpeningDay.toLowerCase(),
                                time: nearestSchedule[0],
                            }}
                        />
                    ) : (
                        <FormattedMessage
                            id="location.opensInTime"
                            defaultMessage="• Откроется в {time}"
                            values={{ time: nearestSchedule[0] }}
                        />
                    )}
                </Text>
            ) : isOpen ? (
                <Text>
                    <Text style={styles.openned}>
                        <FormattedMessage id="location.opened" defaultMessage="Открыто" />
                    </Text>{' '}
                    <FormattedMessage
                        id="location.closesIn"
                        defaultMessage="• Закроется в {time}"
                        values={{ time: nearestSchedule[1] }}
                    />
                </Text>
            ) : (
                <Text>
                    <Text style={styles.closed}>
                        <FormattedMessage id="location.closed" defaultMessage="Закрыто" />
                    </Text>{' '}
                    <FormattedMessage
                        defaultMessage="• Откроется{day} в {time}"
                        values={{ day: nearestOpeningDay, time: nearestSchedule[0] }}
                    />
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
