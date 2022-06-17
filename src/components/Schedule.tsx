import React, { FC, memo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { StyleSheet, View } from 'react-native'
import { Subheading } from 'react-native-paper'

import { daysLocale } from '../locales/days'

export interface Props {
    readonly index: number
    readonly value: Array<[string, string]> | false
}

export const Schedule: FC<Props> = memo(function Schedule({ value, index }) {
    const intl = useIntl()
    return (
        <View style={styles.base}>
            {/* @ts-ignore*/}
            <Subheading>{intl.formatMessage(daysLocale[`day${index}`])}</Subheading>
            <View style={styles.hours}>
                {!value ? (
                    <Subheading>
                        <FormattedMessage id="day.holiday" />
                    </Subheading>
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
