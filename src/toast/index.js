import { toast } from "sonner"

export class Toast {
    #message
    #state

    succes(message) {
        this.#message = message || this.#message
        this.#state = 'success'
    }

    error(message) {
        this.#message = message
        this.#state = 'error'
    }

    message(message) {
        this.#message = message
    }

    cancel() {
        if (this.#state != 'success' && this.#state != 'error') this.#state = 'cancelled'
    }

    constructor(message) {
        this.#message = ''
        this.#state = 'loading'

        toast.promise(new Promise(
            (resolve, reject) => {
                let iteration = 0
                const interValId = setInterval(() => {
                    if (this.#state == 'cancelled') {
                        clearInterval(interValId)
                        toast.dismiss()
                    }
                    else if (this.#state == 'success') {
                        clearInterval(interValId)
                        resolve(this.#message)
                    }
                    else if (this.#state == 'error') {
                        clearInterval(interValId)
                        reject(this.#message)
                    }

                    iteration = iteration + 1
                    if (iteration > 10) clearInterval(interValId)
                }, 500)
            }),
            {
                loading: message,
                success(message) {
                    return message
                },
                error(message) {
                    return message
                }
            }
        )
    }
}

export default Toast