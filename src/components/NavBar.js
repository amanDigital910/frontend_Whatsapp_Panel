import React from 'react'
import menuIcon from '../assets/icons/paragraph.png';
import bulkicon from '../assets/icons/wp bulk.png'
import userImage from '../assets/profile.png';
import whatsappIcon from '../assets/icons/whatsapp.png';

const NavBar = ({ setIsOpen, isOpen }) => {
    return (
        <nav className="bg-[#383387] p-3 px-4 flex fixed w-full z-50 justify-between items-center text-white">
            <div className='flex gap-2 items-center justify-center'>
                <div className={`relative  overflow-hidden h-12 w-12 hidden md:flex`}>
                    {/* <img
                        alt="Profile Background"
                        src={whatsappIcon}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    /> */}
                </div>
                <img
                    src={menuIcon}
                    alt="Menu"
                    className="navbar-toggler text-white cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                />

                <img src={bulkicon} alt="icon" width="30px" className='ms-3 h-8  md:hidden' />
                <h1 className="font-bold text-[30px] m-0 md:hidden">Whatsapp Bulk Marketing</h1>
            </div>
            <a className="navbar-brand text-white" href="#"><img src={userImage} alt="User Profile" width={50} height={20} /></a>
        </nav>
    )
}

export default NavBar