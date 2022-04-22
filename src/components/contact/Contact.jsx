import React, { useRef, useEffect } from 'react'
import { MdOutlineEmail } from 'react-icons/md'
import { RiMessengerLine } from 'react-icons/ri'
import { BsWhatsapp } from 'react-icons/bs'
import emailjs from 'emailjs-com'
import Aos from 'aos'

import './contact.css'
import 'aos/dist/aos.css'


const Contact = () => {
  
  useEffect(()=>{
      Aos.init({duration: 2000});
  }, []);

  const form = useRef();

  const sendEmail = (email) => {
    email.preventDefault();

    emailjs.sendForm('service_4fz4nde', 'template_ud0tg2g', form.current, 'fxOKeIgdBUBc2P-mK');

    email.target.reset();
  };

  return (
    <section data-aos="fade-up" id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail className='contact__option-icon' />
            <h4>E-mail</h4>
            <h5>tahanasyrov@gmail.com</h5>
            <a href="mailto:tahanasyrov@gmail.com" target='_blank'>Send a message</a>
          </article>
          <article className="contact__option">
            <RiMessengerLine className='contact__option-icon'/>
            <h4>Messenger</h4>
            <h5>Takhir Nasyrov</h5>
            <a href="https://m.me/tahir.nasirov" target='_blank'>Send a message</a>
          </article>
          <article className="contact__option">
            <BsWhatsapp className='contact__option-icon' />
            <h4>WhatsApp</h4>
            <h5>+996 556 12 59 98</h5>
            <a href="https://api.whatsapp.com/send?phone=+996556125998" target='_blank'>Send a message</a>
          </article>
        </div>
        {/* END OF CONTACT OPTION */}
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name='name' placeholder='Your Full Name' required/>
          <input type="email" name='email' placeholder='Your E-Mail' required/>
          <textarea name="message" rows="7" placeholder='Your Message'required></textarea>
          <button type='submit' className='btn btn-primary'>Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact