/** @jsx jsx */
import {Container, jsx, Box, Flex, useColorMode, get} from "theme-ui"
import {Themed} from "@theme-ui/mdx"
import {Circle, Donut} from "./shapes"
import {down, upWide} from "../styles/animations"
// @ts-ignore
import UE from "../../static/unreal.png"
import CircleGrid from "../icons/circle-grid"
// @ts-ignore
import CV from "../../public/cv.pdf"
import Contact from "./Contact";
import {StaticImage} from "gatsby-plugin-image";


const AboutMe = () => {
    const [mode] = useColorMode()

    const isStrange = mode === `strangerThings`

    return (
        <section data-name="about-me" sx={{position: `relative`, py: 6}}>
            <Container>
                <div sx={{maxWidth: `760px`}}>
                    <h2 sx={(t) => get(t, `styles.h1`)}>About Me</h2>
                    <Themed.p>Hi 👋</Themed.p>
                    <Themed.p>
                        I’m Takhir — and I’m a beginner Game Developer from France. I’m
                        passionate about working on game projects & developing a good experience for people who plays
                        them.
                    </Themed.p>
                    <Themed.p>
                        You can find me on my <Themed.a href="https://www.google.com">Homepage</Themed.a> where I post
                        my Games and
                        Web Projects. I also like to experiment with 3D sometime.
                        I'm currently studying Game Programming & Design in <Themed.a
                        href="https://www.ynov.com/formation/ynov-masteres/jeux-video-programming/">Lyon Ynov
                        Campus</Themed.a>.
                        And I'm also a Fullstack Engine Developer in <Themed.a
                        href="https://cabri.com/">Cabrilog</Themed.a>.

                    </Themed.p>
                    <Themed.p>
                        I started learning Game Development with Unity in 2020 since then I created a bunch of mini
                        games implementing
                        a variety of different gameplay mechanics. I myself learned so much with free and open source
                        content as well
                        as paid courses from Udemy, <Themed.a href="https://www.gamedev.tv/">GameDev.TV</Themed.a> Unity
                        & Unreal courses.
                    </Themed.p>
                </div>
            </Container>
            <Circle size={[`200px`, `200px`, `300px`]} color="red" top="-75px" right="-75px"/>
            <Circle
                size={[`25px`, `25px`, `50px`]}
                color="gray"
                top="-25px"
                right={[`175px`, `175px`, `275px`]}
                sx={{zIndex: 10}}
            />
            <Circle
                size={[`15px`, `15px`, `25px`]}
                color="pink"
                top="50px"
                right={[`145px`, `145px`, `375px`]}
                sx={{animation: `${upWide} 20s ease-in-out infinite alternate`}}
            />
            <StaticImage src="../../static/unreal.png" alt="Unreal Engine" sx={{
                width: [70, 70, 90],
                height: [70, 70, 90],
                top: `105px`,
                right: [`40px`, `40px`, `240px`],
                position: `absolute`,
                color: `white`,
            }}/>
            <Circle
                size={[`100px`, `100px`, `120px`]}
                color="darkIndigo"
                top="90px"
                right={[`25px`, `25px`, `225px`]}
                sx={{boxShadow: `0 0 0 30px rgba(90, 103, 216, 0.15)`}}
            />
            <Donut color="yellow" size="200px" top="-100px" width="30px" left="-50px" sx={{opacity: 0.5}}/>
            <Donut
                color="blue"
                size="50px"
                top="-25px"
                width="8px"
                left="180px"
                sx={{opacity: 0.5, animation: `${down} 10s ease-in-out infinite alternate`}}
            />
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
                        Do you want to support me?
                    </h3>
                    <Themed.p sx={{textShadow: `0 1px 1px rgba(0, 0, 0, 0.2)`}}>
                        I'm grateful for every form of support: Share this website or my CV with your friends &
                        colleagues, buy me a tea
                        or a good coffee, or consider supporting me on Patreon. Thanks for visiting my page! 😊
                    </Themed.p>
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
                        <a href={CV} download sx={{variant: `buttons.white`}}>
                            Get CV
                        </a>
                        <a href="https://patreon.com/user?u=82048251" sx={{variant: `buttons.white`}}>
                            Patreon
                        </a>
                        <a href="https://ko-fi.com/taktakgamedev" sx={{variant: `buttons.white`}}>
                            Buy me a tea
                        </a>
                    </Flex>
                </Box>
                <Circle
                    color="orange"
                    size={[`60px`, `80px`, `130px`]}
                    top={[`0px`, `-30px`, `-60px`]}
                    right={[`20px`, `70px`]}
                    sx={{zIndex: 10}}
                />
                <Circle
                    color="green"
                    size={[`20px`, `25px`, `30px`]}
                    top={[`-10px`, `-40px`, `-80px`]}
                    right={[`100px`, `170px`, `220px`]}
                    sx={{zIndex: 10}}
                />
                <Donut color="pink" size={[`300px`, `340px`]} top="150px" width="40px" right="-160px"
                       sx={{opacity: 0.35}}/>
                <CircleGrid color="blue" size={260} top="-20px" left={[`-180px`, `-120px`, `-120px`]}/>
            </Container>
            <Contact/>
        </section>
    )
}

export default AboutMe
