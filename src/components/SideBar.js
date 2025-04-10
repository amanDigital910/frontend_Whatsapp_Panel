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
import UserIcon from '../assets/icons/user1.png';
import whatsappIcon from '../assets/icons/whatsapp.png';
import userImage from '../assets/profile.png';
import bulkicon from '../assets/icons/wp bulk.png'
// import logout from '../assets/icons/logout (1).png'
const SideBar = () => {
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData); // Parse the JSON string
      setUserData(parsedData.user); // Set the user object in state
    } else {
      console.log("No user data found in local storage.");
    }
  }, []);

  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login")
  }

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
    }
  ];

  return (
    <nav className="navbar navbar-light fixed-top w-full" style={{ backgroundColor: "#383387" }}>
      <div className="container-fluid">
        <div className="flex sm:flex-col flex-row">
          <img src={menuIcon} alt="User Image" className="navbar-toggler text-white" type="button" onClick={toggleSidebar}/>
          <img src={bulkicon} alt="icon" width="40px" className='ms-3' />
          <a className="navbar-brand text-white ps-4 font-bold lg:text-2xl sm:text-lg" href="/">Whatsapp Bulk Marketing</a>
        </div>
        <a className="navbar-brand text-white" href="#"><img src={userImage} alt="User Profile" width={50} height={20} /></a>

        <div className="offcanvas offcanvas-start bg-[#1da850] hidden md:flex " id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{ width: "300px", backgroundColor: '#1DA850' }}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-white" id="offcanvasNavbarLabel">{userData ? userData.userName : ""}</h5>
            <button type="button" className="btn-close-white btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body text-white">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {sidebarMenu.map((item, index) => (
                item.dropdown ? (
                  <li className="nav-item dropdown" key={index}>
                    <a
                      className="nav-link dropdown-toggle text-white d-flex align-items-center"
                      id={`dropdown${index}`}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={item.icon} width={20} height={20} />
                      <span className="ms-2 text-base">{item.label}</span>
                    </a>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`dropdown${index}`}
                      style={{ backgroundColor: "#1da850", border: 0 }}
                      onClick={handleDropdownClick}
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.to}
                            className="dropdown-item text-white text-base ml-4"
                            style={{
                              backgroundColor: "transparent", // No background
                              transition: "color 0.3s ease",   // Smooth transition
                            }}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item" key={index}>
                    <Link to={item.to} className="nav-link text-white d-flex">
                      <img src={item.icon} width={20} height={20} />
                      <span className="ms-2 text-base">{item.label}</span>
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </div>
          <div className='w-75  ms-2 mb-2'>
            <button className='btn btn-success w-100' onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
