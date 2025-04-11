import React from 'react'
import menuIcon from '../assets/icons/paragraph.png';
import bulkicon from '../assets/icons/wp bulk.png'
import userImage from '../assets/profile.png';
<<<<<<< HEAD
import whatsappIcon from '../assets/icons/whatsapp.png';
import useIsMobile from '../hooks/useMobileSize';

const NavBar = ({ setIsOpen, isOpen }) => {
    const isMobile = useIsMobile();

    return (
        <nav className={`bg-[#383387] p-3 px-4 fixed w-full flex flex-wrap h-[70px] z-50 justify-between items-center text-white 
        ${isMobile ? 'left-0 w-full'
                : isOpen ? 'left-[260px] w-[calc(100%-260px)]' : 'left-[80px] w-[calc(100%-101px)]'}`}>
            <div className={`flex gap-2 items-center justify-center h-full ${isMobile && 'ml-[80px]'} `}>

                {/* Whatsapp Header Image */}
                <div className={`z-50 absolute bg-[#120d50] flex justify-center items-center p-2.5 top-0 px-4 h-full
                ${!isMobile
                        ? isOpen
                            ? 'w-[260px] -left-[260px]'
                            : 'w-[80px] -left-[80px] '
                        : '!w-[80px] left-[0px]'
                    } `}
                >
                    <img
                        alt="User Icon"
                        src={bulkicon}
                        className={`flex items-center justify-center bg-transparent bg-cover
                            ${isMobile ? 'p-0 w-[30px] h-[30px]' : `w-[50px] h-[50px] ${isOpen ? 'p-1.5' : 'px-0 py-2'}`}`}/>                          
                </div>
                <img
                    src={menuIcon}
                    alt="Menu"
                    className="navbar-toggler text-white cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                />

=======
import useIsMobile from '../hooks/useMobileSize';
import './style.css'

const NavBar = ({ setIsOpen, isOpen }) => {
    const isMobile = useIsMobile();

    return (
        <nav className={`bg-[#383387] p-3 px-4 fixed w-full flex flex-wrap h-[70px] z-50 justify-between items-center text-white 
        ${isMobile ? 'left-0 w-full'
                : isOpen ? 'left-[260px] w-[calc(100%-261px)]' : 'left-[80px] w-[calc(100%-80px)]'}`}>
            <div className={`flex gap-2 items-center justify-center h-full ${isMobile && 'ml-[80px]'} `}>

                {/* Whatsapp Header Image */}
                <div className={`z-50 absolute bg-[#120d50] flex justify-center items-center p-2.5 top-0 px-4 h-full
                ${!isMobile
                        ? isOpen
                            ? 'w-[260px] -left-[260px]'
                            : 'w-[80px] -left-[80px] '
                        : '!w-[80px] left-[0px]'
                    } `}
                >
                    <img
                        alt="User Icon"
                        src={bulkicon}
                        className={`flex items-center justify-center bg-transparent bg-cover
                            ${isMobile ? 'p-0 w-[30px] h-[30px]' : `w-[50px] h-[50px] ${isOpen ? 'p-1.5' : 'px-0 py-2'}`}`} />
                </div>
                <div
                    className=" button-menu-mobile waves-effect hover:opacity-40 text-white cursor-pointer inline-block overflow-hidden select-none align-middle z-[1] transition-all duration-300 ease-out">
                    <img
                        src={menuIcon}
                        alt="Menu"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </div>


>>>>>>> sidebar_navbar_menu
                {/* WhatsApp Icon and Text */}
                <img src={bulkicon} alt="icon" width="30px" className='ms-3 h-8 flex' />
                <h1 className="font-bold text-[30px] m-0 md:hidden">Whatsapp Bulk Marketing</h1>
            </div>
<<<<<<< HEAD
            <div className='flex flex-1 justify-end  '>
                <img src={userImage} alt="User Profile" width={40} height={20} className='' />
=======
            <div className="button-menu-mobile waves-effect hover:opacity-40 text-white cursor-pointer inline-block overflow-hidden select-none align-middle transition-all duration-300 ease-out">
                <img src={userImage} alt="User Profile" width={40} height={20} className='flex flex-1 justify-end' />
>>>>>>> sidebar_navbar_menu
            </div>
        </nav >
    )
}

export default NavBar