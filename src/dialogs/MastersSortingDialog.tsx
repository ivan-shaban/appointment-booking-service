import { useStore } from 'effector-react'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'

import { SortingEntry } from '../components/SortingEntry'
import {
    $mastersSorting,
    SortOrder,
    resetMastersOrdering,
    setMastersOrdering,
} from '../store/sorting'

export interface Props {
    /**
     * Determines whether clicking outside the dialog dismiss it.
     */
    dismissable?: boolean
    /**
     * Callback that is called when the user dismisses the dialog.
     */
    onDismiss?: () => void
    /**
     * Determines Whether the dialog is visible.
     */
    visible: boolean
    style?: StyleProp<ViewStyle>
}

export const MastersSortingDialog: FC<Props> = memo(function MastersSortingDialog(props) {
    const sorting = useStore($mastersSorting)
    const [{ name, rating, feedbacks }, setState] = useState(sorting)

    const handleSortingByNameChange = useCallback((order: SortOrder) => {
        setState((prev) => ({
            ...prev,
            name: order,
        }))
    }, [])

    const handleSortingByRatingChange = useCallback((order: SortOrder) => {
        setState((prev) => ({
            ...prev,
            rating: order,
        }))
    }, [])

    const handleSortingByFeedbacksChange = useCallback((order: SortOrder) => {
        setState((prev) => ({
            ...prev,
            feedbacks: order,
        }))
    }, [])

    const handleReset = useCallback(() => {
        resetMastersOrdering()

        props.onDismiss?.()
    }, [props.onDismiss])

    const handleApply = useCallback(() => {
        setMastersOrdering({ name, rating, feedbacks })

        props.onDismiss?.()
    }, [props.onDismiss, name, rating, feedbacks])

    useEffect(() => {
        if (props.visible) {
            setState(sorting)
        }
    }, [props.visible, sorting])

    return (
        <Portal>
            <Dialog {...props}>
                <Dialog.Title>????????????????????</Dialog.Title>
                <Dialog.Content>
                    <SortingEntry
                        title="???? ??????????"
                        order={name}
                        onChange={handleSortingByNameChange}
                    />
                    <SortingEntry
                        title="???? ????????????????"
                        order={rating}
                        onChange={handleSortingByRatingChange}
                    />
                    <SortingEntry
                        title="???? ???????????????????? ??????????????"
                        order={feedbacks}
                        onChange={handleSortingByFeedbacksChange}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleReset}>????????????????</Button>
                    <Button onPress={handleApply}>??????????????????</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
})

const styles = StyleSheet.create({})
