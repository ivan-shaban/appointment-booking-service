import React, { FC, memo, useCallback } from 'react'
import { Linking, StyleSheet } from 'react-native'
import { Subheading } from 'react-native-paper'

export interface Props {
    readonly phone: string
}

export const PhoneRecord: FC<Props> = memo(function PhoneRecord({ phone }) {
    const handleTelPress = useCallback(() => {
        Linking.openURL(`tel:${phone}`)
    }, [phone])
    return (
        <Subheading style={styles.base} onPress={handleTelPress}>
            {phone}
        </Subheading>
    )
})

const styles = StyleSheet.create({
    base: {
        fontWeight: 'bold',
        color: 'blue',
    },
})
