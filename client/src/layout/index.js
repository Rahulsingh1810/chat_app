import React from 'react'
import logo from '../assets/logos/logo.png'
const AuthLayouts = ({children}) => {
  return (
    <>
        <header className='flex justify-center items-center py- h-20 shadow-md bg-white'>
            <img src={logo} alt='logo'
            width={125}
            height={40}
            />
        </header>

        { children }
    </>
  )
}

export default AuthLayouts