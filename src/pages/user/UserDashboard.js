import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (url) => {
    navigate(url);
  };
  const MsgCategory = [
    {
      id: 1,
      cardName: "Virtual Quick Campaign",
      cardCredit: 0,
      bg: "#216ca1",
      redirectUrl: "/user/virtualcampaign",
    },
    {
      id: 2,
      cardName: "Virtual DP Campaign",
      cardCredit: 0,
      bg: "#216ca1",
      redirectUrl: "/user/dpcampaign"
    },
    {
      id: 3,
      cardName: "Virtual Button Campaign",
      cardCredit: 0,
      bg: "#216ca1",
      redirectUrl: "/user/buttoncampaign"
    },
    {
      id: 4,
      cardName: "Virtual CSV Campaign",
      cardCredit: 0,
      bg: "#1eb32a",
      redirectUrl: "/user/csvvirtual"
    },
    {
      id: 5,
      cardName: "Personal Quick Campaign",
      cardCredit: 0,
      bg: "#1eb32a",
      redirectUrl: "/personal/campaign"
    },
    {
      id: 6,
      cardName: "Personal Button Campaign",
      cardCredit: 0,
      bg: "#1eb32a",
      redirectUrl: "/personal/button"
    },
    {
      id: 7,
      cardName: "Personal CSV Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl: "/personal/PersonalCsv"
    },
    {
      id: 8,
      cardName: "Personal Poll Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl: "/personal/poll/campaign"
    }
  ];

  return (
    <>
      <section className="container py-5 w-full" style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
        <div className="row g-4 ">
          {MsgCategory.map((item, index) => (
            <div className="group col-12 col-md-6 col-lg-4 cursor-pointer" key={index}>
            <div className="bg-white hover:bg-white shadow-md hover:shadow-xl border border-dark rounded-lg p-4 flex flex-col justify-between h-32 overflow-hidden relative transition-all duration-500 ease-in-out transform hover:scale-105 hover:translate-y-[-5px]">
              
              {/* Background animation */}
              <div className="absolute top-0 left-0 w-full h-full bg-white transform translate-y-[-100%] transition-transform duration-500 ease-in-out group-hover:translate-y-0"></div>
              
              {/* Card Content */}
              <div className="flex justify-between items-center h-full w-full gap-4 relative z-10">
                <div onClick={() => handleCardClick(item.redirectUrl)}>
                  <h2 className="text-primary font-bold leading-snug text-[16px] transition-colors duration-300 hover:text-blue-500 group-hover:underline underline-offset-4">
                    {item.cardName}
                  </h2>
                  <h3 className="text-primary font-semibold text-lg transition-colors duration-300 hover:text-blue-500">
                    Balance - {item.cardCredit}
                  </h3>
                </div>
          
                {/* Icon */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transform transition-transform duration-300 hover:scale-125 text-[1rem]"
                  style={{ backgroundColor: item.bg }} >
                  {item.cardName?.charAt(0) || 'W'}
                </div>
              </div>
            </div>
          </div>
          
          ))}
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default UserDashboard;

const SvgCard = ({ cardColor }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      className="transform transition-transform duration-300 hover:scale-125 text-[3rem]"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        color: cardColor,      // Dynamically setting the color
        fontSize: "3rem",      // Fixed font size

      }}
    >
      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1z"></path>
    </svg>
  );
};
