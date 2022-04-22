import React, {useEffect} from 'react'
import './testimonials.css'
import AVTR1 from '../../assets/person.jpeg'

import Aos from 'aos'
import 'aos/dist/aos.css'

// import Swiper core and required modules
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



const data = [
    {
        avatar: AVTR1,
        name: 'Sophie Loren',
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus at ut minima repudiandae, nulla vitae possimus repellat a facere molestiae accusantium! Sint et rem cum ea illo labore esse aliquam?'
    },
    {
        avatar: AVTR1,
        name: 'Sophie Loren',
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus at ut minima repudiandae, nulla vitae possimus repellat a facere molestiae accusantium! Sint et rem cum ea illo labore esse aliquam?'
    },
    {
        avatar: AVTR1,
        name: 'Sophie Loren',
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus at ut minima repudiandae, nulla vitae possimus repellat a facere molestiae accusantium! Sint et rem cum ea illo labore esse aliquam?'
    }
]


const Testimonials = () => {
    
    useEffect(()=>{
        Aos.init({duration: 2000});
    }, []);

    return (
        <section data-aos="fade-up" id="testimonials">
            <h5>People's review</h5>
            <h2>Testimonials</h2>

            <Swiper className="container testimonials__container"
                // install Swiper modules
                modules={[Pagination]}
                spaceBetween={40}
                slidesPerView={1}
                pagination={{ clickable: true }}
            >
                {
                    data.map(({avatar, name, review}, index) =>{
                        return (
                            <SwiperSlide key={index} className="testimonial">
                                <div className="client__avatar">
                                    <img src={avatar} alt="Person's avatar" />
                                </div>
                                <h5 className='client__name'>{name}</h5>
                                <small className="client__review">{review}</small>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </section>
    )
}

export default Testimonials