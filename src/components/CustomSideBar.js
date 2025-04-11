import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import creditCardIcon from '../assets/icons/credit-card.png';
import dashboardIcon from '../assets/icons/dashboard.png';
import home from '../assets/icons/home.png';
import world from '../assets/icons/world.png';
import exchange from '../assets/icons/exchange.png';
import groupIcon from '../assets/icons/group.png';
import menuIcon from '../assets/icons/paragraph.png';
import templateIcon from '../assets/icons/template.png';
import UserIcon from '../assets/profile_Logo.png';
import whatsappIcon from '../assets/icons/whatsapp.png';
import ProfileImgBG from '../assets/profile_img_logo_bg.jpg';
import useIsMobile from '../hooks/useMobileSize';
import './style.css'

const SideBar = ({ isOpen, toggleDropdown, activeDropdown }) => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login")
    }

    const isMobile = useIsMobile();

    const sidebarMenu = [
        {
            label: "Admin Dashboard",
            to: "/AdminDashboard",
            icon: dashboardIcon
        },
        {
            label: "Transaction Logs",
            to: "/Transitiontable",
            icon: dashboardIcon
        },
        {
            label: "Dashboard",
            to: "/Dashboard",
            icon: home
        },
        {
            label: "Wa Virtual",
            icon: whatsappIcon,
            dropdown: [
                { label: "Quick Campaign", to: "/user/virtualcampaign" },
                { label: "DP Campaign", to: "/user/dpcampaign" },
                { label: "Button Campaign", to: "/user/buttoncampaign" },
                { label: "CSV Campaign", to: "/user/csvvirtual" },
                { label: "WhatsApp Report", to: "/user/whatsappreport" }
            ]
        },
        {
            label: "Wa Personal",
            icon: whatsappIcon,
            dropdown: [
                { label: "Quick Campaign", to: "/personal/campaign" },
                { label: "Button Campaign", to: "/personal/button" },
                { label: "Personal Csv Campaign", to: "/personal/PersonalCsv" },
                { label: "Poll Campaign", to: "/personal/poll/campaign" },
                { label: "WhatsApp Report", to: "/personal/report" },
                { label: "WhatsApp Scan", to: "/personal/scan" }
            ]
        },
        {
            label: "Wa Int. Virtual",
            icon: world,
            dropdown: [
                { label: "Quick Campaign", to: "/international/campaign" },
                { label: "CSV Campaign", to: "/international/csvcampaign" },
                { label: "Button Campaign", to: "/international/buttoncampaign" },
                { label: "Whatsapp Reports", to: "/international/whatsappreport" }
            ]
        },
        {
            label: "Wa Int. Personal",
            icon: exchange,
            dropdown: [
                { label: "Quick Campaign", to: "/international/personal/campaign" },
                { label: "Csv Campaign", to: "/international/personal/csvcampaign" },
                { label: "Button Campaign", to: "/international/personal/buttoncampaign" },
                { label: "Poll Campaign", to: "/international/personal/pollcampaign" },
                { label: "Whatsapp Reports", to: "/international/personal/report" },
                { label: "Whatsapp Scan", to: "/international/personal/scan" }
            ]
        },
        {
            label: "Group",
            to: "/group",
            icon: groupIcon
        },
        {
            label: "Template",
            to: "/template",
            icon: templateIcon
        },
        {
            label: "Manage User",
            to: "/manageuser",
            icon: UserIcon
        },
        {
            label: "Manage Credit",
            to: "/managecredit",
            icon: creditCardIcon
        },
    ];

    return (
        <div className={`transition-all duration-300 ${isOpen ? "w-64" : "ml-20 w-0"} md:ml-0 text-white flex flex-nowrap md:absolute `}>
            {/* {!isMobile && ( */}
            <div
                style={{ maxHeight: "100vh" }}
                className={`md:mt-20 fixed top-0 left-0 h-full bg-green-600 text-white ${isOpen ? "w-64" : "w-20"} z-50 transition-all duration-300 overflow-y-auto hide-scrollbar`}
            >
                {/* Sidebar Header */}
                <div className={`relative w-full overflow-hidden ${isOpen ? "h-64" : "h-20"}`}>
                    {/* Background Image */}
                    <img
                        alt="Profile Background"
                        src={ProfileImgBG}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />

                    {/* User Icon Overlay */}
                    <img
                        alt="User Icon"
                        src={UserIcon}
                        className={`absolute flex items-center justify-center bottom-2 left-1/2 transform -translate-x-1/2 border-white w-full h-full bg-transparent
                        p-4 transition-all duration-300 ease-in-out shadow-md object-cover z-10  ${isOpen ? 'w-full h-full bg-cover ' : ''}`} />
                </div>

                {/* Menu Items */}
                <ul className="space-y-1 py-0 px-0">
                    {sidebarMenu.map((item, index) => (
                        <li key={index} className="text-white">
                            {item.dropdown ? (
                                <div className="group">
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className={`w-full flex items-center p-3 hover:bg-green-700 transition ${isOpen ? "justify-between" : "justify-center"}`}
                                    >
                                        <div className={`flex items-center ${isOpen ? "space-x-2" : ""} justify-center`}>
                                            <img src={item.icon} width={20} height={20} alt="" />
                                            {isOpen && <span className="text-base">{item.label}</span>}
                                        </div>
                                        {isOpen && (
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? "rotate-180" : ""}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </button>

                                    {activeDropdown === index && isOpen && (
                                        <ul className="mt-1 space-y-1 transition-all duration-300 ease-in-out">
                                            {item.dropdown.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        to={subItem.to}
                                                        className="block px-2 py-2 text-sm text-white rounded hover:bg-green-700 no-underline hover:underline underline-offset-2"
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to={item.to}
                                    // className={`w-full flex items-center rounded px-2 hover:bg-green-700 transition ${isOpen ? "justify-between" : "justify-center"}`}
                                    className={`flex items-center text-white hover:bg-green-700 no-underline hover:underline underline-offset-2 px-2 py-2 ${isOpen ? "justify-start space-x-2" : "justify-center"}`}
                                >
                                    <div className={`flex items-center ${isOpen ? "space-x-2" : ""} p-2 justify-center`}>
                                        <img src={item.icon} width={20} height={20} alt="" />
                                        {isOpen && <span className="text-base">{item.label}</span>}
                                    </div>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Logout */}
                {isOpen && (
                    <div className="px-4 pb-4">
                        <button
                            className="w-full py-2 mt-4 bg-white text-green-700 font-semibold rounded hover:bg-green-100 transition"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
}

export default SideBar