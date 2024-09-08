import { useNavigate } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { setQuery } from '../../redux'
import { BROWSE } from '../../configs'

const category = [
    { name: 'Frontend Developer', str: 'front|\\Wui\\W|frontend' },
    { name: 'Backend Developer', str: 'backend|\\WSDE\\W|software\\Wenginner' },
    { name: 'Data Science', str: 'data.science|science|scientist|\\Wml\\W|tensor|pytroch' },
    { name: 'Graphic Designer', str: 'graphic|designer|adobe|photoshop|illustrator' },
    { name: 'FullStack Developer', str: 'software\\Wdeveloper|SDE|fullstack' },
    { name: 'UI/UX Developer', str: 'designer|ui\\/ux|\\Wux\\W' },
    { name: 'IT Support', str: 'support' },
    { name: 'DevOps Enginners', str: 'devop|kubernetes|GCP|AWS|AZURE|docker' }
]

export function JobCarousel() {
    const navigate = useNavigate()

    const onCatSearch = (cat) => {
        setQuery({ cat })
        navigate(BROWSE)
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent>
                    {
                        category.map(({ name, str }) => (
                            <CarouselItem key={name} className="md:basis-1/3 lg:basis-1/3 basis-auto">
                                <Button onClick={() => onCatSearch(str)} variant="outline" className="rounded-full">{name}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default JobCarousel