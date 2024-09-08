import { Link } from 'react-router-dom'
import { HOME } from '../configs'

export function Error() {
    return (
        <div className='flex flex-col items-center justify-center gap-4 h-screen'>
            <h1 className='text-4xl mb-8 font-normal'>(#｀-_ゝ-)</h1>
            <p className='text-5xl tracking-widest text-gray-700'>500 - Page Crashed</p>
            <p className='text-2xl tracking-wide text-gray-700'>
                Go back to <span className='text-blue-500 cursor-pointer'><Link className='text-blue-500 cursor-pointer' to={HOME}>Homepage</Link></span>.
            </p>
        </div>
    )
}

export default Error