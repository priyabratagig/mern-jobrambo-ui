import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input } from '../Components/ui/input'
import { Button } from '../Components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../Components/ui/table'
import { Avatar, AvatarImage } from '../Components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../Components/ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { COMPANY_REGISTER, COMPANY_UPDATE } from '../configs'
import { useRecruiterOnly, useToastDismiss } from '../Hooks'

export function Companies() {
    useRecruiterOnly()
    useToastDismiss()

    const managingCompanies = useSelector(state => state.companies.managingCompanies)
    const [filter, setFilter] = useState('')
    const [filteredCompanies, setFilteredCompanies] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const filteredCompanies = Object.values(managingCompanies).filter(company => new RegExp(filter, 'i').test(company.name))

        setFilteredCompanies(filteredCompanies)
    }, [filter, managingCompanies])

    return (
        <div className='max-w-6xl my-10 grow'>
            <div className='flex items-center justify-between my-5'>
                <Input
                    className="w-fit"
                    placeholder="Filter by name"
                    onChange={({ target }) => setFilter(target.value)}
                />
                <Button onClick={() => navigate(COMPANY_REGISTER)}>New Company</Button>
            </div>
            <div>
                <Table>
                    <TableCaption>A list of your recent registered companies</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Logo</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            filteredCompanies?.map((company) => (
                                <tr key={company.companyid}>
                                    <TableCell>
                                        <Avatar className='rounded-none'>
                                            <AvatarImage src={company.logo} alt='logo' />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick={() => navigate(COMPANY_UPDATE.url(company.companyid))} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Companies