import React, { FC, memo } from 'react'
import { StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper'

import { Service } from '../constants/services'
import { locales } from '../locales/masters'

export interface Props {
    readonly type: Service
    readonly duration?: number
}

export const ServiceChip: FC<Props> = memo(function ServiceChip({ type, duration }) {
    return (
        <Chip icon="plus-circle" style={styles.base} key={type}>
            {locales[type]}
            {duration ? `, ${duration}h` : null}
        </Chip>
    )
})

const styles = StyleSheet.create({
    base: {
        marginTop: 4,
        marginRight: 8,
        padding: 0,
    },
})
