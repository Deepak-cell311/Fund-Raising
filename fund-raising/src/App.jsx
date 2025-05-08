import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import DonationPage from './Component/DonationPage'
import Dashboard from './Dashboard/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TransactionPage from './Pages/TransactionPage';
import Payment from './Component/Payment';
import StartHerePage from './Pages/StartHerePage';
import FAQ from './Pages/FaqPage';
import Feedback from './Pages/FeedbackPage';
import LearningModules from './Pages/LearningModulePage';
import Rewards from './Pages/RewardsPage';

function App() {

  return (
    <>
      <Router>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/start-here" element={<StartHerePage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/learning-modules" element={<LearningModules />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
