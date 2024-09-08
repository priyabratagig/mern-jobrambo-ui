import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CompanyForm } from '../Components'
import { COMPANIES } from '../configs'
import { toast } from 'sonner'
import { update_company } from '../api'
import { setManagingCompanies } from '../redux'
import { useRecruiterOnly } from '../Hooks'

export function CompanyUpdate() {
    useRecruiterOnly()

    const { companyid } = useParams()
    const managingCompanies = useSelector(state => state.companies.managingCompanies)
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [website, setWebsite] = useState('')
    const [location, setLocation] = useState('')
    const [logo, setLogo] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const company = managingCompanies[companyid]
        if (!company) {
            toast.error('Company not found')

            navigate(COMPANIES)
        }

        setName(company.name)
        setDescription(company.description)
        setWebsite(company.website)
        setLocation(company.location)
        setLogo(company.logo)
    }, [managingCompanies, companyid, navigate])

    const onSubmit = async () => {
        setLoading(true)

        const companyInfo = {
            companyid,
            name,
            description,
            website,
            location,
            logo
        }

        try {
            const company = await update_company(companyInfo)

            const newManagingCompanies = { ...managingCompanies, [company.companyid]: company }
            setManagingCompanies(newManagingCompanies)

            toast.success('Company info updated')

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

export default CompanyUpdate