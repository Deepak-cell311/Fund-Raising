import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import DonationPage from './Component/DonationPage'
import Dashboard from './Dashboard/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TransactionPage from './Component/TransactionPage';
import Payment from './Component/Payment';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/donation" element={<DonationPage />} />
          <Route path="/dashboard/*" element={<GeneralDashboard />} />
          <Route path="/payment" element={<Payment />} />

        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}




export default App


const GeneralDashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="transaction" element={<TransactionPage />} />
      </Routes>
    </>
  );
};
