import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { graphql } from "gatsby";

// styles
const containerStyles = {
  display: "flex",
  justifyContent: "space-around",
};

const pageStyles = {
  minHeight: "100vh",
  maxWidth: "1000px",
  display: "grid",
  gridAutoFlow: "row",
  padding: "2rem",
  gap: "2rem",
  alignItems: "center",
  zIndex: "999",
  gridTemplateRows: "auto 1fr auto",
  width: "100%",
  color: "#9478D3",
};

const TopStyles = {
  lineHeight: "2.3rem",
  fontSize: "2.3rem",
  transition: ".25s",
  padding: "0 5px",
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "auto 1fr auto",
  zIndex: 2,
  alignItems: "center",
  gap: ".5rem",
  userSelect: "none",
};

const topStyles = {
  fontSize: ".65rem",
  lineHeight: ".65rem",
  marginBottom: "-.4rem",
  marginLeft: "-.1rem",
  color: "#9478D3",
};
const bottomStyles = {
  color: "#00CE7B",
  marginLeft: "-.15rem",
  transition: ".25s",
  cursor: "pointer",
};

const logoStyles = {
  marginBottom: ".6rem",
  whiteSpace: "nowrap",
  userSelect: "none",
};

const MiddleStyles = {
  display: "block",
};

const BottomStyles = {
  position: "relative",
  textAlign: "center",
  lineHeight: "1rem",
  fontSize: ".75rem",
  paddingBottom: "4rem",
};

const keytipsStyles = {
  marginBottom: "2rem",
};

const leftrightStyles = {
  display: "grid",
  gridTemplateColumns: "auto auto",
  gap: "1rem",
};

const leftStyles = {
  textAlign: "left",
  display: "grid",
  gridAutoFlow: "column",
  width: "fit-content",
  gap: "1rem",
};

const rightStyles = {
  textAlign: "right",
  display: "grid",
  gridAutoFlow: "column",
  width: "fit-content",
  justifySelf: "right",
  gap: "1rem",
};

const imageStyles = {
  borderRadius: "5px",
  maxHeight: "500px",
};

// markup
const IndexPage = ({ data }) => {
  const [img, setImg] = useState(
    "https://cdn2.thecatapi.com/images/9Z7JsGrx3.jpg"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        async function fetchImage() {
          const result = await axios.get(
            "https://api.thecatapi.com/v1/images/search"
          );
          setImg(result.data[0].url);
          console.log(result.data[0].url);
        }
        fetchImage();
      } catch (err) {
        console.log(console.log(err));
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [img]);

  return (
    <div style={containerStyles}>
      <div style={pageStyles}>
        <title>Home Page</title>
        <div style={TopStyles}>
          <div style={logoStyles}>
            <div style={topStyles}>welcome to</div>
            <div style={bottomStyles}>randomcat</div>
          </div>
        </div>
        <div style={MiddleStyles}>
          <div>
            {/* <Img
              fluid={
                data.allMarkdownRemark.nodes[0].frontmatter.image
                  .childImageSharp.fluid
              }
            /> */}
            <div style={containerStyles}>
              {img && <img style={imageStyles} src={img} alt="A dinosaur" />}
            </div>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: data.allMarkdownRemark.nodes[0].html,
              }}
            /> */}
          </div>
        </div>
        <div style={BottomStyles}>
          <div style={keytipsStyles}>hello kitties</div>
          <div style={leftrightStyles}>
            <div style={leftStyles}>
              <div>🐈</div>
              <div>🐱</div>
              <div>🐅</div>
            </div>
            <div style={rightStyles}>
              <div>©</div>
              <div>P.R 2021</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

export const query = graphql`
  {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/blogs/" } }) {
      nodes {
        html
        frontmatter {
          image {
            id
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
