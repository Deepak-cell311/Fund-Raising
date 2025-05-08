import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    BookOpen,
    HelpCircle,
    BookMarked,
    Award,
    MessageSquare,
    User,
    Home,
    Menu,
    X,
    Clock,
    Copy,
    Share2
} from 'lucide-react';

import TransactionPage from '../Pages/TransactionPage';

import ProgressCircle from '../Component/ProgressCircle';
import StartHerePage from '../Pages/StartHerePage';
import FAQ from '../Pages/FaqPage';
import LearningModules from '../Pages/LearningModulePage';
import Feedback from '../Pages/FeedbackPage';
import Rewards from '../Pages/RewardsPage';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
};

const GeneralDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isDashboardOpen, setDashboardOpen] = useState(false);
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

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // Close mobile sidebar when a tab is clicked
        if (window.innerWidth < 768) {
            setDashboardOpen(false);
        }
    };

    return (
        <motion.div
            className="flex flex-col md:flex-row min-h-screen bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm">
                <div className="flex items-center">
                    <motion.button
                        onClick={() => setDashboardOpen(!isDashboardOpen)}
                        whileTap={{ scale: 0.9 }}
                        className="mr-3"
                    >
                        {isDashboardOpen ? (
                            <X size={24} className="text-gray-700" />
                        ) : (
                            <Menu size={24} className="text-gray-700" />
                        )}
                    </motion.button>
                    <h1 className="text-xl font-semibold">
                        <span className="text-orange-500">NayePankh</span> Foundation
                    </h1>
                </div>
            </div>

            {/* Sidebar */}
            <AnimatePresence>
                {(isDashboardOpen || window.innerWidth >= 768) && (
                    <motion.div
                        className="fixed md:static top-0 left-0 h-full z-40 bg-white shadow-lg w-[280px] md:w-[280px] py-6 px-4"
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div className="flex justify-between items-center mb-8 md:mb-10">
                            <div className="text-2xl font-bold py-2 px-3 bg-gray-50 rounded-lg w-full">
                                <span className="block text-orange-500">General</span>
                                <span className="text-gray-800">Dashboard</span>
                            </div>
                            <button
                                className="md:hidden"
                                onClick={() => setDashboardOpen(false)}
                            >
                                <X size={24} className="text-gray-500" />
                            </button>
                        </div>

                        <motion.div
                            className="space-y-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {[
                                { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
                                { id: 'transaction', label: 'Transaction', icon: <BookOpen size={20} /> },
                                { id: 'startHere', label: 'Start Here', icon: <Home size={20} /> },
                                { id: 'FAQ', label: 'FAQ', icon: <HelpCircle size={20} /> },
                                { id: 'learning modules', label: 'Learning Modules', icon: <BookMarked size={20} /> },
                                { id: 'rewards', label: 'Rewards', icon: <Award size={20} /> },
                                { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={20} /> }
                            ].map((tab) => (
                                <motion.button
                                    key={tab.id}
                                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === tab.id
                                            ? 'bg-orange-500 text-white'
                                            : 'text-gray-700 hover:bg-orange-50'
                                        }`}
                                    onClick={() => handleTabClick(tab.id)}
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="mr-3">{tab.icon}</span>
                                    <span className="font-medium">{tab.label}</span>
                                </motion.button>
                            ))}
                        </motion.div>

                        <motion.div
                            className="relative left-0 right-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className=" flex items-center p-3 rounded-lg bg-orange-50">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                                    <User size={20} className="text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">Prashant Shukla</p>
                                    <p className="text-xs text-gray-500">Fundraiser</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content */}
            <motion.div
                className="flex-1 overflow-hidden"
                layout
            >
                <AnimatePresence mode="wait">
                    {activeTab === "dashboard" && (
                        <DashboardContent
                            key="dashboard"
                            copyDonationLink={copyDonationLink}
                            shareOnWhatsApp={shareOnWhatsApp}
                            donationLink={donationLink}
                        />
                    )}
                    {activeTab === "transaction" && (
                        <motion.div
                            key="transaction"
                            className="w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <header className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200 bg-white">
                                <h1 className="text-xl font-semibold text-gray-800">Transaction History</h1>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Home size={16} className="text-orange-500 mr-2" />
                                    <span>General / Transaction</span>
                                </div>
                            </header>
                            <TransactionPage />
                        </motion.div>
                    )}
                    {activeTab === "startHere" && (
                        <motion.div
                            key="startHere"
                            className="w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <StartHerePage/>
                        </motion.div>
                    )} 
                    {activeTab === "FAQ" && (
                        <motion.div
                            key="FAQ"
                            className="w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FAQ />
                        </motion.div>
                    )}
                    {activeTab === "learning modules" && (
                        <motion.div
                            key="learning modules"
                            className="w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <LearningModules />
                        </motion.div>
                    )}
                    {activeTab === "rewards" && (
                        <motion.div
                            key="rewards"
                            className="w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Rewards />
                        </motion.div>
                    )}
                    {activeTab === "feedback" && (
                        <motion.div
                            key="feedback"
                            className="w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Feedback />
                        </motion.div>
                    )}
                    
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

const DashboardContent = ({ copyDonationLink, shareOnWhatsApp, donationLink }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <header className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200 bg-white">
                <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                <div className="flex items-center text-sm text-gray-500">
                    <Home size={16} className="text-orange-500 mr-2" />
                    <span>General / Dashboard</span>
                </div>
            </header>

            <div className="p-4 md:p-6">
                {/* Hero Section */}
                <motion.div
                    className="relative w-full h-[250px] md:h-[300px] rounded-2xl overflow-hidden mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-orange-900/70 z-10"></div>
                    <img
                        src="https://images.pexels.com/photos/1250452/pexels-photo-1250452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="happy children"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full z-20 flex flex-col justify-center p-0 md:p-10" >
                        <motion.h1
                            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            style={{scrollbarWidth: "none"}}
                        >
                            Prashant Shukla
                        </motion.h1>
                        <motion.p
                            className="text-base md:text-lg text-white/90 max-w-lg"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            Initial push is the toughest! Go through the learning modules, or reach out to our fundraising manager to level up.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.div
                        className="bg-white rounded-xl shadow-sm p-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">Fundraising Progress</h2>
                            <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                                Active
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-around">
                            <div className="mb-6 md:mb-0">
                                <ProgressCircle percentage={50} size={160} strokeWidth={10} />
                                <div className="mt-4 text-center">
                                    <p className="text-gray-500 text-sm">Goal Achieved</p>
                                    <p className="text-2xl font-bold text-gray-800">₹30,000</p>
                                    <p className="text-sm text-gray-500">of ₹60,000 goal</p>
                                </div>
                            </div>

                            <div className="space-y-4 w-full md:w-auto md:ml-6">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Level Achieved</p>
                                    <div className="flex items-center">
                                        <span className="text-lg font-semibold text-gray-800 mr-2">Star</span>
                                        <Award className="text-yellow-500" size={20} />
                                    </div>
                                </div>

                                <div className="w-full max-w-xs">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-500">Progress to Ninja Level</span>
                                        <span className="font-medium">50%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <motion.div
                                            className="bg-orange-500 h-2 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: "50%" }}
                                            transition={{ delay: 0.5, duration: 1 }}
                                        ></motion.div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Unlock Ninja level at ₹60,000</p>
                                </div>

                                <div>
                                    <p className="flex items-center text-sm font-medium text-gray-500 mb-1">
                                        <Clock size={16} className="mr-1" /> Time Left
                                    </p>
                                    <p className="text-red-600 font-semibold">Campaign Expired</p>
                                </div>

                                <motion.button
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Extend Now
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-xl shadow-sm p-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">Share Your Campaign</h2>

                        <div className="space-y-4">
                            <div className="p-4 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-sm font-medium text-gray-700">Your Donation Link</p>
                                    <motion.button
                                        onClick={copyDonationLink}
                                        className="text-orange-500 hover:text-orange-600"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Copy size={18} />
                                    </motion.button>
                                </div>
                                <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded break-all">
                                    {donationLink}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-3">Share on Social Media</p>
                                <div className="flex flex-wrap gap-3">
                                    <motion.button
                                        onClick={shareOnWhatsApp}
                                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Share2 size={16} className="mr-2" />
                                        WhatsApp
                                    </motion.button>

                                    <motion.button
                                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Share2 size={16} className="mr-2" />
                                        Facebook
                                    </motion.button>

                                    <motion.button
                                        className="flex items-center px-4 py-2 bg-sky-400 text-white rounded-lg text-sm font-medium"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Share2 size={16} className="mr-2" />
                                        Twitter
                                    </motion.button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <motion.button
                                    onClick={() => navigate('/donation')}
                                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium"
                                    whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Create New Donation
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Recent Activity */}
                <motion.div
                    className="bg-white rounded-xl shadow-sm p-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>

                    <div className="space-y-4">
                        {[
                            { name: 'Rajesh Kumar', amount: '₹5,000', time: '2 days ago' },
                            { name: 'Anita Sharma', amount: '₹2,500', time: '4 days ago' },
                            { name: 'Vikram Singh', amount: '₹10,000', time: '1 week ago' },
                        ].map((donation, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                                whileHover={{ x: 5 }}
                            >
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                                        <User size={18} className="text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{donation.name}</p>
                                        <p className="text-xs text-gray-500">{donation.time}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-green-600">{donation.amount}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-4 text-center">
                        <motion.button
                            className="text-orange-500 text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTabClick('transaction')}
                        >
                            View All Transactions
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default GeneralDashboard;