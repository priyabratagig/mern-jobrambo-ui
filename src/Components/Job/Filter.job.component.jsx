import PropTypes from 'prop-types'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const fitlers = [
    {
        type: 'Location',
        subFilters: [{ key: 'Delhi NCR', value: '^delhi' }, { key: 'Bengaluru', value: '^bengaluru' }, { key: 'Hyderabad', value: '^hyderabad' }, { key: 'Pune', value: '^pune' }, { key: 'Mumbai', value: '^mumbai' }]
    },
    {
        type: 'Industry',
        subFilters: [{ key: 'Frontend Developer', value: 'frontend' }, { key: 'Backend Developer', value: 'backend' }, { key: 'FullStack Developer', value: 'fullStack' }]
    },
    {
        type: 'Salary',
        subFilters: [{ key: '0-10LPA', value: '0,10' }, { key: '10-20LPA', value: '10,20' }, { key: '20-50LPA', value: '20,50' }]
    },
]

export function Filter({ setFilter }) {
    const onSelect = (type, value) => {
        if (type === 'Location') setFilter({ location: { $regex: value, $options: 'i' } })
        else if (type === 'Industry') setFilter({ $or: [{ title: { $regex: value, $options: 'i' } }, { description: { $regex: value, $options: 'i' } }] })
        else if (type === 'Salary') {
            const salary = value.split(',').map(num => Number(num))
            setFilter({ salary: { $gte: salary[0], $lte: salary[1] } })
        }
        else setFilter({})
    }

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {
                    fitlers.map((group) => (
                        <div key={group.type}>
                            <h1 className='font-bold text-lg'>{group.type}</h1>
                            {
                                group.subFilters.map((item) => (
                                    <div key={item.value} className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item} id={item.value} onClick={() => onSelect(group.type, item.value)} />
                                        <Label htmlFor={item.value} onClick={() => onSelect(group.type, item.value)}>{item.key}</Label>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

Filter.propTypes = {
    setFilter: PropTypes.func.isRequired
}

export default Filter