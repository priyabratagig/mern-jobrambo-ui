import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { setQuery } from '../../redux'
import { BROWSE } from '../../configs'

export function Baner() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const onSearch = () => {
        setQuery({ search })
        navigate(BROWSE)
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>India&apos;s Biggest Job Searching Platform</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Find your perfect job today! Empowering your career by connecting you with top opportunities worldwide</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        value={search}
                        onChange={({ target }) => setSearch(target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={onSearch} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Baner