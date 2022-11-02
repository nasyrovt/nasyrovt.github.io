// @ts-ignore
import React, {useRef, useEffect} from 'react'
import emailjs from '@emailjs/browser';
import {Box, Button, Container, Flex, get, Input, Label, Textarea, useColorMode} from "theme-ui";


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
                        <Box ref={form} as="form" onSubmit={sendEmail}>
                            <Label htmlFor="fullName">Your Full Name</Label>
                            <Input type="text" name="fullName" id="fullName" mb={3} />
                            <Label htmlFor="email">Your E-Mail</Label>
                            <Input type="email" name="email" id="email" mb={3} />
                            <Label htmlFor="message">Your Message</Label>
                            <Textarea name="message" id="message" rows={6} mb={3} sx={{ width: 800 }} />
                            <Button>Submit</Button>
                        </Box>
                    </Flex>
                </Box>
            </Container>
        </section>
    )
}

export default Contact