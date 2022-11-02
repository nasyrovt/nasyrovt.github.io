// @ts-ignore
import React, {useRef, useEffect} from 'react'
import emailjs from '@emailjs/browser';
import {Box, Container, Flex, get, jsx, useColorMode} from "theme-ui";


const Contact = () => {

    const [mode, setMode] = useColorMode();

    const isStrange = mode === `strangerThings`

    const form = useRef();

    const sendEmail = (email) => {
        email.preventDefault();

        emailjs.sendForm('service_4fz4nde', 'template_ud0tg2g', form.current, 'fxOKeIgdBUBc2P-mK');

        email.target.reset();
    };

    // @ts-ignore
    return (
        <section className="contact__section" data-aos="fade-up" id='contact'>
            <Container sx={{mt: [6, 7], position: `relative`}}>
                <Box
                    sx={{
                        borderRadius: `xl`,
                        variant: isStrange ? `gradients.strangerThings` : `gradients.indigo`,
                        p: [4, 4, 5],
                        color: `white`,
                        boxShadow: (t) => `0px 20px 25px ${get(t, `colors.shadow`)}`,
                    }}
                >
                    <h3
                        sx={{
                            fontWeight: `bold`,
                            fontSize: [2, 3, 4],
                            textAlign: `center`,
                            mb: 4,
                            mt: 0,
                            textShadow: `0 1px 1px rgba(0, 0, 0, 0.2)`,
                        }}
                    >
                        Get in touch with me
                    </h3>
                    <Flex
                        sx={{
                            justifyContent: `space-evenly`,
                            mt: 4,
                            flexWrap: `wrap`,
                            a: {mt: 3, textAlign: `center`},
                            div: {mt: 3},
                            flexDirection: [`column`, `row`],
                        }}
                    >
                        <form ref={form} onSubmit={sendEmail}>
                            <input type="text" name='name' placeholder='Your Full Name' required/>
                            <input type="email" name='email' placeholder='Your E-Mail' required/>
                            <textarea name="message" rows="7" placeholder='Your Message' required></textarea>
                            <button type='submit' className='btn btn-primary'>Send Message</button>
                        </form>
                    </Flex>
                </Box>
            </Container>
        </section>
    )
}

export default Contact