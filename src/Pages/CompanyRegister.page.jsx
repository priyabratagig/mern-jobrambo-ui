import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Label } from '../Components/ui/label'
import { Input } from '../Components/ui/input'
import { Button } from '../Components/ui/button'
import { CompanyForm } from '../Components'
import { COMPANIES } from '../configs'
import { toast } from 'sonner'
import { create_company } from '../api'
import { setManagingCompanies } from '../redux'
import { useRecruiterOnly } from '../Hooks'

export function CompanyRegister() {
    useRecruiterOnly()

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [website, setWebsite] = useState('')
    const [location, setLocation] = useState('')
    const [logo, setLogo] = useState('')
    const [loading, setLoading] = useState(false)
    const [nextStep, setNextStep] = useState(false)

    const managingCompanies = useSelector(state => state.companies.managingCompanies)

    const onNextStep = () => {
        if (name.length < 1) return toast.error('Name is required')

        setNextStep(true)
    }

    const onSubmit = async () => {
        setLoading(true)

        const companyInfo = {
            name,
            description,
            website,
            location,
            logo
        }

        try {
            const company = await create_company(companyInfo)

            const newManagingCompanies = { ...managingCompanies, [company.companyid]: company }
            setManagingCompanies(newManagingCompanies)

            toast.success("New company added")

            navigate(COMPANIES)
        }
        catch ({ message }) {
            console.error(message)

            toast.error(message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        !nextStep ?
            <div className='max-w-4xl grow'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobRambo, Microsoft etc."
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate(COMPANIES)}>Cancel</Button>
                    <Button onClick={onNextStep}>Continue</Button>
                </div>
            </div>
            :
            <CompanyForm
                name={name} setName={setName}
                description={description} setDescription={setDescription}
                website={website} setWebsite={setWebsite}
                location={location} setLocation={setLocation}
                logo={logo} setLogo={setLogo}
                loading={loading}
                onSubmit={onSubmit}
            />
    )
}

export default CompanyRegister