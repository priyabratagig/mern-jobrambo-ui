import { Fragment } from "react"
import { useSetInitialAppState } from "../Hooks"

export function InitialAppState() {
    useSetInitialAppState()
    return (
        <Fragment></Fragment>
    )
}

export default InitialAppState