import { Baner, JobCarousel, LatestJobs } from '../Components'
import { useToastDismiss } from '../Hooks'

export function Home() {
    useToastDismiss()

    return (
        <>
            <Baner />
            <JobCarousel />
            <LatestJobs />
        </>
    )
}

export default Home