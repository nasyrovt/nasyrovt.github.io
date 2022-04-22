import React from 'react'
import './footer.css'
import { FaFacebookF, FaSteam } from 'react-icons/fa'
import { IoLogoTwitter } from 'react-icons/io'

const Footer = () => {
    return (
        <footer>
            <a href="" className='footer__logo'>NasyrovT</a>

            <ul className="permalinks">
                <li><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>

            <div className="footer__socials">
                <a href="https://facebook.com"><FaFacebookF/></a>
                <a href="https://twitter.com"><IoLogoTwitter/></a>
                <a href="https://steam.com"><FaSteam/></a>
            </div>

            <div className="footer__copyright">
                <small>&copy; Nasyrov Takhir. All rights reserved.</small>
            </div>
        </footer>
    )
}

export default Footer