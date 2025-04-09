import React from 'react';
import { BsCreditCard2BackFill } from "react-icons/bs";
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
      cardName: "Wa Virtual Quick Campaign",
      cardCredit: 0,
      bg: "#216ca1",
      redirectUrl: "/user/virtualcampaign",
    },
    {
      id: 2,
      cardName: "Wa Virtual DP Campaign",
      cardCredit: 0,
      bg: "#216ca1",
      redirectUrl: "/user/dpcampaign"
    },
    {
      id: 3,
      cardName: " Wa Virtual Button Campaign",
      cardCredit: 0,
      bg: "#216ca1",
      redirectUrl: "/user/buttoncampaign"
    },
    {
      id: 4,
      cardName: " Wa Virtual CSV Campaign",
      cardCredit: 0,
      bg: "#1eb32a",
      redirectUrl: "/user/csvvirtual"
    },
    {
      id: 5,
      cardName: "Wa Personal Quick Campaign",
      cardCredit: 0,
      bg: "#1eb32a",
      redirectUrl: "/personal/campaign"
    },
    {
      id: 6,
      cardName: "Wa Personal Button Campaign",
      cardCredit: 0,
      bg: "#1eb32a",
      redirectUrl: "/personal/button"
    },
    {
      id: 7,
      cardName: "Wa Personal CSV Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl: "/personal/PersonalCsv"
    },
    {
      id: 8,
      cardName: "Wa Personal Poll Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl: "/personal/poll/campaign"
    },
    {
      id: 9,
      cardName: "Wa Int. Virtual Quick Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl: "/international/campaign"
    },
    {
      id: 10,
      cardName: "Wa Int. Virtual CSV Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl: "/international/csvcampaign"
    },
    {
      id: 11,
      cardName: "Wa Int. Virtual Button Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl: "/international/buttoncampaign"
    },

    {
      id: 13,
      cardName: "Wa Int. Personal Quick Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl: "/international/personal/campaign"
    },
    {
      id: 14,
      cardName: "Wa Int. Personal CSV Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl: "/international/personal/csvcampaign"
    },
    {
      id: 15,
      cardName: "Wa Int. Personal Button Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl: "/international/personal/buttoncampaign"
    },
    {
      id: 16,
      cardName: "Wa Int. Personal Poll Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl: "/international/personal/pollcampaign"
    }
  ];

  return (
    <>
      <section className="container py-5 mt-5 w-full" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
        <div className="row g-4">
          {MsgCategory.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div className="shadow-sm border border-dark rounded-lg p-4 flex flex-col justify-between h-full">
                <div className="flex justify-between items-center h-full w-full gap-4">
                  <div className="w">
                    <h2
                      className="text-primary font-bold cursor-pointer leading-snug text-xl"
                      onClick={() => handleCardClick(item.redirectUrl)}
                    >
                      {item.cardName}
                    </h2>
                    <h3
                      className="text-primary font-bold cursor-pointer text-lg"
                    >
                      Balance - 01
                    </h3>
                  </div>
                  {/* <BsCreditCard2BackFill
                    className="transform transition-transform duration-300 hover:scale-125 text-[3rem]"
                    style={{ color: item.bg, fontSize: '3rem' }}
                  /> */}
                  <SvgCard cardColor={item.bg} />
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
        height: "3rem",        // Fixed height
        width: "3rem",         // Fixed width
      }}
    >
      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1z"></path>
    </svg>
  );
};
