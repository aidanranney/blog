import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { graphql } from 'gatsby'

class Resume extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Layout>
        <SEO title="Resume" />
        <div className="resumeContainer">
            <div className="contact">
                <span><a href={'https://github.com/aidanranney'}>Github</a></span>
                <span><a href={'https://www.linkedin.com/in/aidan-ranney-429208149/'}>LinkedIn</a></span>
            </div>
            <h5 className="header1">Profile</h5>
            <h5 className="header2">Education</h5>
            <h5 className="header3">Relevant Experience</h5>
            <h5 className="header4">Skills</h5>
            <h5 className="header5">Other Work/<br/>Past Experiences</h5>
            <h5 className="header6">References</h5>
            <p className="profile">As a recent graduate of the Information and Computer Systems program at Camosun College, I have gained extensive practical experience in applying object-oriented programming concepts, as well as in web application development, database and systems administration and technical writing. My objective is to find a work placement where I can further reinforce and expand my skill set.</p>
            <div classname="education1">
                <h5>Camosun College, Victoria, BC. 2017 - 2019</h5>
                <p>Diploma. Information and Computer Systems Technology. 8.7 GPA (9-Point)</p>
            </div>
            <div className="education2">
                <h5>University of British Columbia - Okanagan, Kelowna, BC. 2007 - 2010</h5>
                <p>Completed 75 credits toward BA in Creative Writing.</p>
            </div>
            <div className="experience">
                <h5>Student Developer, Proline Management/Camosun College. January - June 2019</h5>
                <p>Capstone project. I worked with a team of other students and our client sponsors, Proline Property Management, to design and build a web application to track property keys. MariaDB database, Express API and React front end. Integrated a label printer and barcode scanner to make use of QR codes for tagging and tracking.</p>
            </div>
            <ul className="skills">
                <li>Java, C++, C#, Swift (Xcode), ES6/ES7 JavaScript (React.js, Node.js), Python, PHP</li>
                <li>SQL, PL/SQL and NoSQL (Oracle, MySQL/MariaDB, MongoDB)</li>
                <li>Basic Linux and Windows-based server and desktop administration</li>
                <li>Outstanding communication and proofreading/writing skills</li>
            </ul>
            <div className="other1">
                <h5>Foo Asian Street Food, Server/Prep/Line Cook. 2010 - Present</h5>
                <p>Worked all positions of a busy restaurant. Self-directed learning to acquire soft-skills in customer service, as well as skills in food preparation and cooking. Took an active role in solving operational problems as they arose during service.</p>
            </div>
                <div className="other2">
                <h5>The Phoenix Newspaper, Copy Editor. 2007 - 2010</h5>
                <p>Was responsible for the proofreading and editing of journalistic copy for both grammatical and factual correctness. Gained experience with Adobe InDesign. Served as occasional section editor and both contributed and sourced content. Worked with hard deadlines to meet commitments and quality standards.</p>
            </div>
            <p className="references">References available upon request.</p>
        </div>
      </Layout>
    )
  }
}

export default Resume

export const pageQuery = graphql`
query {
    resume: file(relativePath: { eq: "web-resume.png" }) {
      childImageSharp {
          fluid {
              ...GatsbyImageSharpFluid
          }
      }
    }
  }
`