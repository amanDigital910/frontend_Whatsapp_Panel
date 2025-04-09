import React from 'react';
import { BsCreditCard2BackFill } from "react-icons/bs";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (url) => {
    navigate(url);
  };
  const SampleJson = [
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
      redirectUrl:"/user/dpcampaign"
    },
    {
      id: 3,
      cardName: " Wa Virtual Button Campaign",
      cardCredit: 0,
      bg: "#216ca1",
       redirectUrl:"/user/buttoncampaign"
    },
    {
      id: 4,
      cardName: " Wa Virtual CSV Campaign",
      cardCredit: 0,
      bg: "#1eb32a",
       redirectUrl:"/user/csvvirtual"
    },
    {
      id: 5,
      cardName: "Wa Personal Quick Campaign",
      cardCredit: 0,
      bg: "#1eb32a",
      redirectUrl:"/personal/campaign"
    },
    {
      id: 6,
      cardName: "Wa Personal Button Campaign",
      cardCredit: 0,
      bg: "#1eb32a",
       redirectUrl:"/personal/button"
    },
    {
      id: 7,
      cardName: "Wa Personal CSV Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl:"/personal/PersonalCsv"
    },
    {
      id: 8,
      cardName: "Wa Personal Poll Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl:"/personal/poll/campaign"
    },
    {
      id: 9,
      cardName: "Wa Int. Virtual Quick Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl:"/international/campaign"
    },
    {
      id: 10,
      cardName: "Wa Int. Virtual CSV Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl:"/international/csvcampaign"
    },
    {
      id: 11,
      cardName: "Wa Int. Virtual Button Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl:"/international/buttoncampaign"
    },
  
    {
      id: 13,
      cardName: "Wa Int. Personal Quick Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl:"/international/personal/campaign"
    },
    {
      id: 14,
      cardName: "Wa Int. Personal CSV Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl:"/international/personal/csvcampaign"
    },
    {
      id: 15,
      cardName: "Wa Int. Personal Button Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl:"/international/personal/buttoncampaign"
    },
    {
      id: 16,
      cardName: "Wa Int. Personal Poll Campaign",
      cardCredit: 0,
      bg: "#6576ff",
      redirectUrl:"/international/personal/pollcampaign"
    }
    
  ];

  return (
    <>
      <section className="container py-5 mt-5" style={{ backgroundColor: "#ffffff", minHeight: "00vh", width: "200vw" }}>
        <div className="row g-4">
          {SampleJson.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <div className="card shadow-sm border border-dark"> {/* Added border here */}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                    <h5
                        className="card-title fw-bold text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCardClick(item.redirectUrl)}
                      >
                        {item.cardName}
                      </h5>
                      {/* {item.cardCredit === 1 ? (
                        <h6 className="text-primary mt-3 fw-semibold">{item.texthere}</h6>
                       ) 
                      : (
                        <h6 className="text-primary mt-3 fw-semibold">
                          Balance - {item.cardCredit}
                        </h6>
                      )
                      } */}
                    </div>
                    <BsCreditCard2BackFill
                      style={{ color: item.bg, fontSize: '2rem' }}
                    />
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
