import {graphql, useStaticQuery} from "gatsby";
import * as React from "react";
import {Box, Container, Flex, get} from "theme-ui";
import {Themed} from "@theme-ui/mdx";
import {Circle, Donut} from "../components/shapes";
import {upWide} from "../styles/animations";
import {GatsbyImage, StaticImage} from "gatsby-plugin-image";

export default function BlogPostTemplate({data: {markdownRemark}}) {
    const {frontmatter, html} = markdownRemark;
    return (
        <section sx={{px: 6,py: 6}}>
            <Flex sx={{paddingLeft: `5%`, paddingTop: `100px`}}>
              <Themed.h1>{frontmatter.title}</Themed.h1>
            </Flex>
            <Flex sx={{paddingLeft: `5%`}}>
              <Themed.h5>Stack: {frontmatter.stack}</Themed.h5>
            </Flex>
            <Flex sx={{paddingLeft: `5%`}}>
              <Themed.h5>Genre: <Themed.i>{frontmatter.genre}</Themed.i></Themed.h5>
            </Flex>
            <Flex sx={{paddingLeft: `5%`}}>
              <Themed.h5>Target audience: <Themed.i>{frontmatter.targetAudience}</Themed.i></Themed.h5>
            </Flex>
            <Flex sx={{paddingLeft: `5%`}}>
              <Themed.h5>Controls: <Themed.i>{frontmatter.controls}</Themed.i></Themed.h5>
            </Flex>
            <Flex sx={{paddingLeft: `5%`}}>
              <Themed.h5>Platform: <Themed.i>{frontmatter.platform}</Themed.i></Themed.h5>
            </Flex>
            <Box
              sx={{
                py: [5, 5, 6],
                display: `grid`,
                gridTemplateColumns: [`1fr`, `1fr`, `1fr 1fr`],
                gridGap: [3, 4, 5],
                alignItems: `flex-start`,
              }}
            >
              <Flex sx={{paddingX: `5%`, flexDirection: `column`, alignItems: `flex-start` }}>
                <GatsbyImage style={{maxWidth:`1020px`}} image={frontmatter.image.childImageSharp.gatsbyImageData} alt="Project" />
              </Flex>
              
              <Flex sx={{paddingX: `10%`, flexDirection: `column`, alignItems: `flex-start` }}>
                <div  dangerouslySetInnerHTML={{__html: html}}/>
              </Flex>
            </Box>

            <Circle size={[`200px`, `200px`, `300px`]} color="red" top="-75px" right="5px"/>
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
            <Circle
                size={[`100px`, `100px`, `120px`]}
                color="darkIndigo"
                top="90px"
                right={[`25px`, `25px`, `225px`]}
                sx={{boxShadow: `0 0 0 30px rgba(90, 103, 216, 0.15)`}}
            />
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
            <Donut color="pink" size={[`300px`, `340px`]} top="550px" width="40px" left="160px" sx={{opacity: 0.35}}/>
        </section>
    );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        stack
        genre
        targetAudience
        controls
        platform
        image {
          childImageSharp {
            gatsbyImageData(
              width: 1900
              aspectRatio: 2
              placeholder: BLURRED
              transformOptions: { cropFocus: SOUTH, fit: COVER }
            )
          }
        }
      }
    }
  }
`;









          