import React from 'react'
import {Link} from 'react-router-dom'

const Logo = () => {
    return (
        <Link to={"/"}
            className="navbar-brand fw-bold text-success">
            GRP_12
        </Link>
    )
}

export default Logo
