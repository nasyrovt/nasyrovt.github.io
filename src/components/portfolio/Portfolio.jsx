import React, {useEffect} from 'react'
import './portfolio.css'
import IMG1 from '../../assets/portfolio1.jpeg'
import Aos from 'aos'
import 'aos/dist/aos.css'

const data =[
    {
        id:1,
        image: IMG1,
        title: 'Name of a First Project',
        github: 'https://github.com',
        demo: 'https://github.com'
    },
    {
        id:2,
        image: IMG1,
        title: 'Name of a Second Project',
        github: 'https://github.com',
        demo: 'https://github.com'
    },
    {
        id:1,
        image: IMG1,
        title: 'Name of a Third Project',
        github: 'https://github.com',
        demo: 'https://github.com'
    },
    {
        id:1,
        image: IMG1,
        title: 'Name of a Fourth Project',
        github: 'https://github.com',
        demo: 'https://github.com'
    },
    {
        id:1,
        image: IMG1,
        title: 'Name of a Fifth Project',
        github: 'https://github.com',
        demo: 'https://github.com'
    },
    {
        id:1,
        image: IMG1,
        title: 'Name of a Sixth Project',
        github: 'https://github.com',
        demo: 'https://github.com'
    }
]

const Portfolio = () => {
    
    useEffect(()=>{
        Aos.init({duration: 2000});
    }, []);

    return (
        <section data-aos="fade-up" id='portfolio'>
            <h5>My Recent Works</h5>
            <h2>Portfolio</h2>
            <div className="container portfolio__container">
                {
                    data.map(({id, image, title, github, demo}) =>{
                        return(
                            <article key={id} className="portfolio__item">
                                <div className="portfolio__item-image">
                                    <img src={image} alt={title} />
                                </div>
                                <h3>{title}</h3>
                                <div className="portfolio__item-cta">
                                    <a href={github} className="btn" target='_blank'>GitHub</a>
                                    <a href={demo} className="btn btn-primary" target='_blank'>Demo</a>
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Portfolio