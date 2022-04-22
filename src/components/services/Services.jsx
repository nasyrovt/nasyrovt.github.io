import React, {useEffect} from 'react'
import './services.css'
import {BiCheck} from 'react-icons/bi'
import Aos from 'aos'
import 'aos/dist/aos.css'


const Services = () => {
    
    useEffect(()=>{
        Aos.init({duration: 2000});
    }, []);

    return (
        <section data-aos="fade-up" id='services'>
            <h5>What I Offer</h5>
            <h2>Services</h2>

            <div className="container services__container">
                <article className="service">
                    <div className="service__head">
                        <h3>UX/UI Design</h3>
                    </div>

                    <ul className="service__list">
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                    </ul>
                </article>
                {/* END OF UX/UI */}
                <article className="service">
                    <div className="service__head">
                        <h3>UX/UI Design</h3>
                    </div>

                    <ul className="service__list">
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                    </ul>
                </article>
                {/* END OF SECOND LIST */}
                <article className="service">
                    <div className="service__head">
                        <h3>UX/UI Design</h3>
                    </div>

                    <ul className="service__list">
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                        <li>
                            <BiCheck className='service__list-icon'/>
                            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
                        </li>
                    </ul>
                </article>
            </div>
        </section>
    )
}

export default Services