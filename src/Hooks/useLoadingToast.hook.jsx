import { useCallback, useEffect, useRef } from "react"
import { toast } from "sonner"

export function useLoadingToast() {
    const message = useRef('')
    const success = useRef(() => { })
    const error = useRef(() => { })
    const cancel = useRef(() => { })

    const toastInit = useCallback((msg) => {
        const promise = new Promise((resolve, reject) => {
            toast.dismiss()
            const abortcontoler = {
                signal: false
            }
            cancel.current = () => {
                abortcontoler.signal = true
                toast.dismiss()
            }
            error.current = (msg) => {
                if (abortcontoler.signal) return undefined
                reject(message.current || msg || '')
            }
            success.current = (msg) => {
                if (abortcontoler.signal) return undefined
                resolve(message.current || msg || '')
            }
        })

        toast.promise(promise, {
            loading: msg,
            success(msg) {
                return msg
            },
            error(msg) {
                return msg
            },
        })
    }, [])

    useEffect(() => () => {
        toast.dismiss()
        cancel.current()
    }, [])

    const setToastMesage = useCallback((msg) => {
        message.current = msg
    }, [])

    const toastSuccess = useCallback((msg) => {
        success.current(msg)
    }, [])
    const toastError = useCallback((msg) => {
        error.current(msg)
    }, [])

    return { toastInit, setToastMesage, toastSuccess, toastError }
}

export default useLoadingToast
