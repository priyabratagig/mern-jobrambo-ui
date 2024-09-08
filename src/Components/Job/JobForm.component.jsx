import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { JOB_LISTING } from '../../configs'

export function JobForm({
    title, setTitle,
    description, setDescription,
    requirements, setRequirements,
    salary, setSalary,
    location, setLocation,
    type, setType,
    experience, setExperience,
    positions, setPositions,
    companyid, setCompanyid,
    loading,
    onSubmit
}) {
    const managingCompanies = useSelector(state => state.companies.managingCompanies)
    const companies = Object.values(managingCompanies || {})
    const navigate = useNavigate()

    const onEventSumbit = (e) => {
        e.preventDefault()

        return false
    }

    return (
        <form onSubmit={onEventSumbit} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
            <div className='-mt-4 mb-4 -ml-4'>
                <Button onClick={() => navigate(JOB_LISTING)} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                    <ArrowLeft />
                    <span>{title?.length ? 'Jobs' : 'Back'}</span>
                </Button>
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        name="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input
                        type="text"
                        name="description"
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>Requirements</Label>
                    <Input
                        type="text"
                        name="requirements"
                        value={requirements}
                        onChange={({ target }) => setRequirements(target.value)}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>Salary</Label>
                    <Input
                        type="text"
                        name="salary"
                        value={salary}
                        onChange={({ target }) => setSalary(target.value)}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>Location</Label>
                    <Input
                        type="text"
                        name="location"
                        value={location}
                        onChange={({ target }) => setLocation(target.value)}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>Job Type</Label>
                    <Input
                        type="text"
                        name="type"
                        value={type}
                        onChange={({ target }) => setType(target.value)}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>Experience Level</Label>
                    <Input
                        type="text"
                        name="experience"
                        value={experience}
                        onChange={({ target }) => setExperience(target.value)}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                <div>
                    <Label>No of Postion</Label>
                    <Input
                        type="number"
                        name="positions"
                        value={positions}
                        onChange={({ target }) => setPositions(target.value)}
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                    />
                </div>
                {
                    companies.length > 0 && (
                        <Select value={companyid} onValueChange={(value) => setCompanyid(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Company" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        companies.map((company) => {
                                            return (
                                                <SelectItem key={company.companyid} value={company.companyid}>{company.name}</SelectItem>
                                            )
                                        })
                                    }

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )
                }
            </div>
            {
                loading ?
                    <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :
                    <Button className="w-full my-4" onClick={onSubmit}>Post</Button>
            }
            {
                companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
            }
        </form>
    )
}

JobForm.propTypes = {
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,

    description: PropTypes.string.isRequired,
    setDescription: PropTypes.func.isRequired,

    requirements: PropTypes.string.isRequired,
    setRequirements: PropTypes.func.isRequired,

    salary: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    setSalary: PropTypes.func.isRequired,

    location: PropTypes.string.isRequired,
    setLocation: PropTypes.func.isRequired,

    type: PropTypes.string.isRequired,
    setType: PropTypes.func.isRequired,

    experience: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    setExperience: PropTypes.func.isRequired,

    positions: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    setPositions: PropTypes.func.isRequired,

    companyid: PropTypes.string.isRequired,
    setCompanyid: PropTypes.func.isRequired,

    loading: PropTypes.bool.isRequired,

    onSubmit: PropTypes.func.isRequired
}

export default JobForm