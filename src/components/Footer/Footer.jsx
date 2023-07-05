import "./index.scss"
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa"

import React from 'react'

const Footer = () => {
  return (
    <div className="credits">
    <h3>Autor: Douglas Dantas de Souza</h3>
    <ul>
      <li><a href="http://instagram.com/dougdantas_" target="__blank"><FaInstagram size={30} /></a></li>
      <li><a href="http://github.com/douglasleg1" target="__blank"><FaGithub size={30}/></a></li>
      <li><a href="https://www.linkedin.com/in/dougdantas/" target="__blank"><FaLinkedin size={30}/></a></li>
    </ul>
    </div>
  )
}

export default Footer