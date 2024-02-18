import React from 'react'
import Navbar from '../Component/navbar'
import Footer from '../Component/footer'
import MainContents from '../Component/mainContents'

export default function HomePage(props) {
  return (
    <div>
        <Navbar role={props.role} setRole={props.setRole}/>
        <MainContents/>
        <Footer />
    </div>
  )
}
