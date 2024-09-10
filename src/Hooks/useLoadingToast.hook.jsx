import { useCallback, useEffect, useRef } from "react"
import { toast } from "sonner"

// eslint-disable-next-line react-refresh/only-export-components
const STATES = { SUCCESS: 'SUCCESS', ERROR: 'ERROR' }

export function useLoadingToast() {
    const state = useRef()
    const message = useRef()
    const abortControler = useRef(null)

    const toastInit = useCallback((msg) => {
        if (abortControler.current instanceof Function) abortControler.current()

        const promise = new Promise((resolve, reject) => {
            const abort = {
                signal: false,
                abort() {
                    abort.signal = true
                }
            }
            abortControler.current = abort.abort
            state.current = ''
            let iterationCount = 0

            const interValId = setInterval(() => {
                if (abort.signal) {
                    toast.dismiss()
                    clearInterval(interValId)
                    return undefined
                }

                switch (state.current) {
                    case STATES.ERROR:
                        reject(message.current)
                        clearInterval(interValId)
                        return undefined

                    case STATES.SUCCESS:
                        resolve(message.current)
                        clearInterval(interValId)
                        return undefined
                }

                if (++iterationCount > 60) clearInterval(interValId) // stop after 30s
            }, 500)
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
        if (abortControler.current instanceof Function) abortControler.current()
    }, [])

    const setToastMesage = useCallback((msg) => {
        message.current = msg
    }, [])
    const toastSuccess = useCallback((msg) => {
        message.current = msg || message.current || ''
        state.current = STATES.SUCCESS
    }, [])
    const toastError = useCallback((msg) => {
        message.current = msg || message.current || ''
        state.current = STATES.ERROR
    }, [])

    return { toastInit, setToastMesage, toastSuccess, toastError }
}

export default useLoadingToast
