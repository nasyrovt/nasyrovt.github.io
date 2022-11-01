import {graphql} from "gatsby";
import * as React from "react";
import {Container, get} from "theme-ui";
import {Themed} from "@theme-ui/mdx";
import {Circle, Donut} from "../components/shapes";
import {upWide} from "../styles/animations";
import CircleGrid from "../icons/circle-grid";

export default function BlogPostTemplate({data: {markdownRemark}}) {
    const {frontmatter, html} = markdownRemark;
    return (
        <section data-name="about-me" sx={{position: `relative`, py: 6}}>
            <Container>
                <div sx={{maxWidth: `760px`}}>
                    <h1 sx={(t) => get(t, `styles.h1`)}>{frontmatter.title}</h1>
                    <Themed.p>{frontmatter.stack}</Themed.p>
                    <img src={frontmatter.image} alt="Project"></img>
                    <div dangerouslySetInnerHTML={{__html: html}}/>
                </div>
            </Container>
            <Circle size={[`200px`, `200px`, `300px`]} color="red" top="-75px" right="5px" />
            <Circle
                size={[`25px`, `25px`, `50px`]}
                color="gray"
                top="-25px"
                right={[`175px`, `175px`, `275px`]}
                sx={{ zIndex: 10 }}
            />
            <Circle
                size={[`15px`, `15px`, `25px`]}
                color="pink"
                top="50px"
                right={[`145px`, `145px`, `375px`]}
                sx={{ animation: `${upWide} 20s ease-in-out infinite alternate` }}
            />
            <Circle
                size={[`100px`, `100px`, `120px`]}
                color="darkIndigo"
                top="90px"
                right={[`25px`, `25px`, `225px`]}
                sx={{ boxShadow: `0 0 0 30px rgba(90, 103, 216, 0.15)` }}
            />
            <Circle
                color="orange"
                size={[`60px`, `80px`, `130px`]}
                top={[`0px`, `-30px`, `-60px`]}
                right={[`20px`, `70px`]}
                sx={{ zIndex: 10 }}
            />
            <Circle
                color="green"
                size={[`20px`, `25px`, `30px`]}
                top={[`-10px`, `-40px`, `-80px`]}
                right={[`100px`, `170px`, `220px`]}
                sx={{ zIndex: 10 }}
            />
            <Donut color="pink" size={[`300px`, `340px`]} top="550px" width="40px" left="160px" sx={{ opacity: 0.35 }} />
            <CircleGrid color="blue" size={260} top="-20px" left={[`-180px`, `-120px`, `-120px`]} />
        </section>
    );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        image
        title
        stack
      }
    }
  }
`;