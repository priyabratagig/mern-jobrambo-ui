import { AppliedJobs, User } from "../Components"
import { useToastDismiss, useUsersOnly } from "../Hooks"

export function Profile() {
    useToastDismiss()
    useUsersOnly()

    return (
        <>
            <User />
            <AppliedJobs />
        </>
    )
}

export default Profile