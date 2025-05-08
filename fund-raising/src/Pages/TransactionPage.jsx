// import { useEffect, useState } from "react"
// // import { format } from 'date-fns';

// const TransactionPage = () => {
//     const [transaction, setTransaction] = useState([])
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPayments = async () => {
//             try {
//                 const response = await fetch('https://fund-raising-ird4.vercel.app/api/payments');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch payments');
//                 }
//                 const data = await response.json();
//                 setTransaction(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPayments();
//     }, [])

//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: 'long', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//     };

//     console.log(transaction)
//     // if (loading) return <div>Loading...</div>;
//     // if (error) return <div>Error: {error}</div>;
//     return (
//         <>
//             <div className='w-full mt-20 h-screen'>
//                 <div className='mx-10 bg-white shadow-2xl py-20'>
//                     <div className="mx-20 rounded-xl">

//                         <table className={`w-full text-sm rounded-lg text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2 border-seperate`}>
//                             <thead className='text-xl text-gray-900   dark:text-gray-400'>
//                                 <tr>
//                                     <th scope="col" className='px-6 py-3 text-black'>ID</th>
//                                     <th scope="col" className='px-6 py-3 text-black'>Name</th>
//                                     <th scope="col" className='px-6 py-3 text-black'>Amount</th>
//                                     <th scope="col" className='px-6 py-3 text-black'>Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>

//                                 {transaction.map((transaction, index) => (
//                                     <tr key={transaction.id} className={`odd:bg-white odd:dark:bg-gray-100 even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-700`}>
//                                         <th className='px-6 py-4 text-black font-bold'>{index + 1}</th>
//                                         <th className='px-6 py-4 text-black font-bold'>{transaction.donorName}</th>
//                                         <th className='px-6 py-4 text-black font-bold'>{transaction.amount}</th>
//                                         <th className='px-6 py-4 text-black font-bold'>{formatDate(transaction.date)}</th>
//                                     </tr>
//                                 ))}

//                             </tbody>
//                         </table >
//                     </div>
//                 </div >
//             </div>
//         </>
//     )
// }

// export default TransactionPage


import React from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample transaction data
const transactions = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', amount: '₹5,000', date: '2023-04-15', status: 'Completed' },
  { id: 2, name: 'Anita Sharma', email: 'anita@example.com', amount: '₹2,500', date: '2023-04-12', status: 'Completed' },
  { id: 3, name: 'Vikram Singh', email: 'vikram@example.com', amount: '₹10,000', date: '2023-04-08', status: 'Completed' },
  { id: 4, name: 'Neha Patel', email: 'neha@example.com', amount: '₹1,000', date: '2023-04-05', status: 'Completed' },
  { id: 5, name: 'Arjun Reddy', email: 'arjun@example.com', amount: '₹7,500', date: '2023-04-02', status: 'Completed' },
];

const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  }
};

const TransactionPage = () => {
  return (
    <motion.div 
      className="p-4 md:p-6 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Filters and Search */}
      <motion.div 
        className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <motion.button 
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter size={16} className="mr-2" />
            <span>Filter</span>
          </motion.button>
          
          <motion.button 
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} className="mr-2" />
            <span>Export</span>
          </motion.button>
        </div>
      </motion.div>
      
      {/* Transactions Table */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm overflow-hidden"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <motion.tr 
                  key={transaction.id}
                  variants={rowVariants}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <span className="text-orange-500 font-medium text-sm">
                          {transaction.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
                        <div className="text-sm text-gray-500">{transaction.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{transaction.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <motion.button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </motion.button>
            <motion.button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">50</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <motion.button
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </motion.button>
                
                <motion.button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  1
                </motion.button>
                <motion.button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-orange-50 text-sm font-medium text-orange-500 hover:bg-orange-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  2
                </motion.button>
                <motion.button
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  3
                </motion.button>
                
                <motion.button
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </motion.button>
              </nav>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TransactionPage;