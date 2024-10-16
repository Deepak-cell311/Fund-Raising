import { useState } from 'react';
import children from "./assets/children.jpg";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TransactionPage from '../Component/TransactionPage';

const GeneralDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isDashboardOpen, setDashboardOpen] = useState(false); // New state for sidebar visibility
    const navigate = useNavigate();

    const donationLink = "https://your-donation-link.com";
    const copyDonationLink = () => {
        navigator.clipboard.writeText(donationLink)
            .then(() => {
                toast.success('Link is now copied to the clipboard!');
                navigate('/donation');
            })
            .catch(err => {
                toast.error('Could not copy text');
                console.error('Could not copy text: ', err);
            });
    };

    const shareOnWhatsApp = () => {
        const message = `Hi, I am raising funds for NayePankh Foundation. Please support me by donating through this link ${donationLink} and make a difference!`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="flex flex-col md:flex-row shadow-2xl">

            {/* Hamburger Menu Icon */}
            <div className="md:hidden flex items-center p-4">
                <button onClick={() => setDashboardOpen(!isDashboardOpen)}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Sidebar section */}
            <div className={`bg-white shadow-2xl w-full md:w-96 py-10 px-5 ${isDashboardOpen ? 'block' : 'hidden md:block'} `}>
                <div className="text-2xl mb-10 py-3 px-2 bg-gray-100 rounded-lg">
                    <span className="block text-orange-500 font-extrabold">General </span>Dashboard
                </div>
                <div>
                    {['dashboard', 'transaction', 'start here', 'FAQ', 'learning modules', 'rewards', 'feedback'].map((tab) => (
                        <aside
                            key={tab}
                            className={`flex text-xl mb-5 cursor-pointer ${activeTab === tab ? 'bg-orange-600 pl-2 py-2 rounded-lg' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {renderIcon(tab)}
                            <span className='mx-9'>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                        </aside>
                    ))}
                </div>
            </div>

            {/* Main content section */}
            <div className={`flex-1 shadow-2xl1 dashboard-modal ${isDashboardOpen ? 'open' : ''}`} onClick={() => setDashboardOpen(false)} >
                {activeTab === "dashboard" && (
                    <DashboardContent copyDonationLink={copyDonationLink} shareOnWhatsApp={shareOnWhatsApp} />
                )}
                {activeTab === "transaction" && (
                    <div className='w-full'>
                        <section className='flex justify-between items-center'>
                            <span className='mt-10 mx-10 text-xl'>Transaction</span>
                            <span className={`mt-10 mx-10 text-xl`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -mx-7 absolute text-orange-500 font-extrabold">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>/General / {activeTab}
                            </span>
                        </section>
                        <TransactionPage />
                    </div>
                )}
            </div>
        </div>
    );
};

const DashboardContent = ({ copyDonationLink, shareOnWhatsApp, }) => (
    <div>
        <section className='flex justify-between items-center'>
            <span className='mt-10 mx-10 text-xl'>Dashboard</span>
            <span className={`mt-10 mx-10 text-xl`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -mx-7 absolute text-orange-500 font-extrabold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>/General / dashboard
            </span>
        </section>
        <div className='relative mx-auto max-w-5xl p-6'>
            <img src={children} alt="happy children" className='children w-full object-fit opacity-80 h-86 mt-10' />
            <div className='absolute top-1/2 transform -translate-y-1/2 md:right-36 md:left-60 right-0 text-center md:text-left'>
                <h1 className='text-orange-600 overflow-hidden text-5xl md:text-6xl font-extrabold mb-2'>Prashant Shukla</h1>
                <span className='text-white font-extrabold italic text-base md:text-lg'>
                    Initial push is the toughest! Go through the learning modules, or reach out to our fundraising manager to level up.
                </span>
            </div>
        </div>
        <article className='mx-10 mt-10 flex flex-col md:flex-col justify-around'>
            <div className='md:flex items-center justify-center md:justify-around'>
                <section className='goalAchieved text-center'>
                    <div className='border-8 border-gray-100 rounded-full py-10 px-3 text-center w-64 h-64 flex items-center justify-center flex-col border-dashed font-bold text-lg'>
                        <h1 className='text-red-600'>Goal Achieved</h1><br />
                        <span className='text-black text-xl'>10</span>
                    </div>
                    <div className='rounded-full text-center w-64 h-20 flex items-center justify-center flex-col border-dashed font-bold text-lg'>
                        <h1 className='text-red-600'>Grand Total</h1><br />
                        <span className='text-black text-xl -mt-6'>₹ 30000</span>
                    </div>
                </section>
                <section className='levelAchieved text-center'>
                    <h1 className='text-red-600 font-bold text-lg mt-7'>Level Achieved: <span className='text-black font-bold text-lg'>Star</span></h1>
                    <progress value={0.5} className='w-96 h-1 progress-bar m-7' />
                    <div className='flex items-center mx-auto justify-center mt-3 mb-3'>
                        <button className='flex text-white font-bold btn bg-gradient-to-r from-red-500 via-red-500 to-blue-500 px-3 py-2 rounded-lg'>
                            Rewards
                        </button>
                        <button className='flex text-white font-bold btn bg-gradient-to-r from-red-500 via-red-500 to-blue-500 px-3 py-2 rounded-lg mx-3' onClick={copyDonationLink}>
                            Copy Donation Link
                        </button>
                    </div>
                    <span className='italic m-4'>Unlock <span className='text-black font-extrabold'>Ninja level</span> at 500</span>
                    <h1 className='text-red-600 font-bold text-lg m-7'>Time Left: <span className='text-black font-bold text-lg'>Campaign Expired</span></h1>
                    <button className='text-white font-bold bg-red-600 px-3 py-2 rounded-lg'>Extend Now</button><br />
                    <progress value={1} className='w-96 h-1 progress-bar m-7' />
                </section>
            </div>
            <section className=' shareNow text-center'>
                <h1 className='text-red-600 font-bold text-lg'>Share Now!</h1>
                <button className='text-white font-bold bg-green-600 px-3 py-2 rounded-lg mx-2 mb-2' onClick={shareOnWhatsApp}>
                    Share on WhatsApp
                </button>
                <button className='text-white font-bold bg-blue-600 px-3 py-2 rounded-lg'>
                    Share on Facebook
                </button>
            </section>
        </article>
    </div>
);

const renderIcon = (tab) => {
    switch (tab) {
        case 'dashboard':
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" /></svg>;;
        case 'transaction':
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" /></svg>;
        case 'start here':
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 "><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg>;
        case 'FAQ':
            return <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium size-9 css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SupervisorAccountOutlinedIcon"><path d="M9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm.05 10H4.77c.99-.5 2.7-1 4.23-1 .11 0 .23.01.34.01.34-.73.93-1.33 1.64-1.81-.73-.13-1.42-.2-1.98-.2-2.34 0-7 1.17-7 3.5V19h7v-1.5c0-.17.02-.34.05-.5zm7.45-2.5c-1.84 0-5.5 1.01-5.5 3V19h11v-1.5c0-1.99-3.66-3-5.5-3zm1.21-1.82c.76-.43 1.29-1.24 1.29-2.18C19 9.12 17.88 8 16.5 8S14 9.12 14 10.5c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32s.85-.12 1.21-.32z"></path></svg>;
        case 'learning modules':
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>;
        case 'rewards':
            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" /></svg>;

        case 'feedback':
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6"><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" /></svg>
        default:
            return null;
    }
};

export default GeneralDashboard;
