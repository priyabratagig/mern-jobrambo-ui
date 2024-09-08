import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { COMPANIES } from '../../configs'

export function CompanyForm({ name, setName, description, setDescription, website, setWebsite, location, setLocation, logo, setLogo, onSubmit, loading }) {
    const navigate = useNavigate()

    const onEventSumbit = (e) => {
        e.preventDefault()

        return false
    }

    return (
        <div className='max-w-xl mx-auto my-10 grow'>
            <form onSubmit={onEventSumbit}>
                <div className='flex items-center gap-5 p-8'>
                    <Button onClick={() => navigate(COMPANIES)} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                        <ArrowLeft />
                        <span>Back</span>
                    </Button>
                    <h1 className='font-bold text-xl'>Company Details</h1>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <Label>Company Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={description}
                            onChange={({ target }) => setDescription(target.value)}
                        />
                    </div>
                    <div>
                        <Label>Website</Label>
                        <Input
                            type="url"
                            name="website"
                            value={website}
                            onChange={({ target }) => setWebsite(target.value)}
                        />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input
                            type="text"
                            name="location"
                            value={location}
                            onChange={({ target }) => setLocation(target.value)}
                        />
                    </div>
                    <div>
                        <Label>Logo</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            file={logo.files && logo}
                            onChange={({ target }) => setLogo(target.files[0])}
                        />
                    </div>
                </div>
                {
                    loading ?
                        <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :
                        <Button onClick={onSubmit} className="w-full my-4">Submit</Button>
                }
            </form>
        </div>
    )
}

CompanyForm.propTypes = {
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,

    description: PropTypes.string.isRequired,
    setDescription: PropTypes.func.isRequired,

    website: PropTypes.string.isRequired,
    setWebsite: PropTypes.func.isRequired,

    location: PropTypes.string.isRequired,
    setLocation: PropTypes.func.isRequired,

    logo: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    setLogo: PropTypes.func.isRequired,

    loading: PropTypes.bool.isRequired,

    onSubmit: PropTypes.func.isRequired
}

export default CompanyForm