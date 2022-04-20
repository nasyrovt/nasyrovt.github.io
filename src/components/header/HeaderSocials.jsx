import React from 'react'
import { BsLinkedin, BsGithub, BsFacebook } from "react-icons/bs"

const HeaderSocials = () => {
    return (
        <div className='header__socials'>
            <a href="https://linkedin.com/nasyrovt" target="_blank" rel="noreferrer"><BsLinkedin /></a>
            <a href="https://github.com/nasyrovt" target="_blank" rel="noreferrer"><BsGithub /></a>
            <a href="https://facebook.com/taha.nasirov" target="_blank" rel="noreferrer"><BsFacebook /></a>
        </div>
    )
}

export default HeaderSocials