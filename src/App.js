import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import SideBar from './components/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Pages
const Dashboard = lazy(() => import('./pages/user/UserDashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const TransitionCReditUser = lazy(()=> import('./pages/admin/TransitionCReditUser'))

const LoginScreen = lazy(() => import('./pages/auth/UserLogin'));

const VirtualCampaign = lazy(() => import("./pages/user/wa_virtual/VirtualCampaign"));
const CsvVirtualCampaign = lazy(() => import("./pages/user/wa_virtual/CSV_Campaign"));
const DpVirtualCampaign = lazy(() => import("./pages/user/wa_virtual/VirtualDpCampaign"));
const ButtonCampaign = lazy(() => import("./pages/user/wa_virtual/VirtualButtonCampaign"));
const WhatsappReport = lazy(() => import("./pages/user/wa_virtual/WhatsappReport"));
const PersonalCSVButton=lazy(()=> import("./pages/user/wa_personal/PersonalCSVButton"))
const PerosnalCampaign2 = lazy(() => import("./pages/user/wa_personal/PerosnalCampaign2"));
const PersonalPoll = lazy(() => import("./pages/user/wa_personal/PersonalCampaignPoll"));
const PersonalCsv = lazy(() => import("./pages/user/wa_personal/personal_csv"));
const PersonalButton = lazy(() => import("./pages/user/wa_personal/PerosnalButton"));
const PersonalCampaign = lazy(() => import("./pages/user/wa_personal/PersonalWaReport"));
const PersonalCampaignScan = lazy(() => import("./pages/user/wa_personal/PersonalCampaignScan"));
const PersonalCampaignChannel = lazy(() => import("./pages/user/wa_personal/personalCampaignChannel"));
const PersonalCampaignCommunity = lazy(() => import("./pages/user/wa_personal/personalCampaignCommunity"));

const InternaitionaCampaign = lazy(() => import("./pages/user/wa_int_virtual/InternaitionaCampaign"));
const InternaitionaCsv = lazy(() => import("./pages/user/wa_int_virtual/InternationalVirtualCsv"));
const InternaitionaButton = lazy(() => import("./pages/user/wa_int_virtual/InternationalCampaigeButton"));
const InternationalWhatsappReport = lazy(() => import("./pages/user/wa_int_virtual/InternationalWhatsappReport"));

const InternationCampaigePersonal = lazy(() => import("./pages/user/wa_int_personal/InternationCampaigePersonal"));
const InternationalCampaignCsv = lazy(() => import("./pages/user/wa_int_personal/InternationalCampaignCsv"));
const InternationalCampaignButton = lazy(() => import("./pages/user/wa_int_personal/InternationalCampaignButton"));
const InternationalCampaignPoll = lazy(() => import("./pages/user/wa_int_personal/InternationalCampaignPoll"));
const InternationalReport = lazy(() => import("./pages/user/wa_int_personal/internationalReport"));
const InternationalPersonalScan = lazy(() => import("./pages/user/wa_int_personal/InternationalPersonalScan"));


const GroupCampaign = lazy(() => import("./pages/user/GroupCampaign"));
const TemplateCampaign = lazy(() => import("./pages/user/TemplateCampaign"));

const ManageUser = lazy(() => import("./pages/user/ManageUser"));
const ManageCredit = lazy(() => import("./pages/user/ManageCredit"));
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine if the current page should show sidebar and navbar
  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      <div className="flex h-screen">
        {/* Sidebar */}
        {!isLoginPage && (
          <div className="bg-gray-800 h-full">
            <SideBar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-[100%]">
          {/* Scrollable content area */}
          <div className="h-[100%] overflow-y-auto">
            <Suspense fallback={<div>Loading......</div>}>
              <Routes>
                {/* Default redirect to /login */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginScreen />} />
                {/* Dashboard admin and user */}
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path='/Transitiontable' element={<TransitionCReditUser/>} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Wa virtual campaige */}
                <Route path="/user/virtualcampaign" element={<VirtualCampaign />} />
                <Route path="/user/dpcampaign" element={<DpVirtualCampaign />} />
                <Route path="/user/buttoncampaign" element={<ButtonCampaign />} />
                <Route path="/user/whatsappreport" element={<WhatsappReport />} />
                <Route path="/user/csvvirtual" element={<CsvVirtualCampaign />} />
                {/* wa personal Campaige */}
                <Route path="/personal/campaign" element={<PerosnalCampaign2 />} />
                <Route path="/personal/poll/campaign" element={<PersonalPoll />} />
                <Route path="/personal/PersonalCsv" element={<PersonalCsv />} />
                <Route path="/personal/button" element={<PersonalButton />} />
                {/* <Route path='/personal/Personalbutton' element={<PersonalCSVButton/> } /> */}
                <Route path="/personal/report" element={<PersonalCampaign />} />
                <Route path="/personal/scan" element={<PersonalCampaignScan />} />
                <Route path="/personal/channel" element={<PersonalCampaignChannel />} />
                <Route path="/personal/community" element={<PersonalCampaignCommunity />} />
                {/* wa Int virtual */}
                <Route path="/international/campaign" element={<InternaitionaCampaign />} />
                <Route path="/international/csvcampaign" element={<InternaitionaCsv />} />
                <Route path="/international/buttoncampaign" element={<InternaitionaButton />} />
                <Route path="/international/whatsappreport" element={<InternationalWhatsappReport />} />
                {/* Wa Int Personal */}
                <Route path="/international/personal/campaign" element={<InternationCampaigePersonal />} />
                <Route path="/international/personal/csvcampaign" element={<InternationalCampaignCsv />} />
                <Route path="/international/personal/buttoncampaign" element={<InternationalCampaignButton />} />
                <Route path="/international/personal/pollcampaign" element={<InternationalCampaignPoll />} />
                <Route path="/international/personal/report" element={<InternationalReport />} />
                <Route path="/international/personal/scan" element={<InternationalPersonalScan />} />

                <Route path="/group" element={<GroupCampaign />} />
                <Route path="/template" element={<TemplateCampaign />} />

                <Route path='/manageuser' element={<ManageUser />} />
                <Route path='/managecredit' element={<ManageCredit />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
