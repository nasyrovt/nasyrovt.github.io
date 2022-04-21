import React from 'react'
import "./experience.css"
import {BsPatchCheckFill} from 'react-icons/bs'

const Experience = () => {
    return (
        <section id='experience'>
            <h5>What Skills I Have</h5>
            <h2>My Experience</h2>

            <div className="container experience__container">
                <div className="experience__frontend">
                    <h3>Frontend Developement</h3>
                    <div className="experience__content">
                        <article className='experience__details'>
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                                <small className="text-light">Experienced</small>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                                <small className="text-light">Experienced</small>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                                <small className="text-light">Experienced</small>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                                <small className="text-light">Experienced</small>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                                <small className="text-light">Experienced</small>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                                <small className="text-light">Experienced</small>
                            </div>
                        </article>
                    </div>
                </div>
                {/* END OF FRONTEND */}
                
                <div className="experience__backend">
                <h3>Backend Developement</h3>
                    <div className="experience__content">
                    <article className='experience__details'>
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                                <small className="text-light">Experienced</small>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                                <small className="text-light">Experienced</small>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                                <small className="text-light">Experienced</small>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                                <small className="text-light">Experienced</small>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                                <small className="text-light">Experienced</small>
                            </div>
                        </article>
                        <article className='experience__details'>
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4>HTML</h4>
                                <small className="text-light">Experienced</small>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>        
    )
}

export default Experience