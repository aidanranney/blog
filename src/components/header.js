import { Link } from "gatsby"
import React from "react"
import { scale } from '../utils/typography'

const Header = ({ siteTitle }) => (
  <div className="header">
    <h1 style={{ ...scale(1.5) }}>
      <Link className="layoutLink" to="/">{siteTitle}</Link>
    </h1>
    <div className="header-right">
      <h5>
        <Link className="layoutLink" to="/about">about</Link>
      </h5>
      <h5>
        <Link className="layoutLink" to="/resume">resume</Link>
      </h5>
    </div>
  </div>
)

export default Header
