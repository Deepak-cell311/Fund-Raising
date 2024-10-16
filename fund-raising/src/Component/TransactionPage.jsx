import { useEffect, useState } from "react"
// import { format } from 'date-fns';

const TransactionPage = () => {
    const [transaction, setTransaction] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('https://fund-raising-psi.vercel.app/payments');
                if (!response.ok) {
                    throw new Error('Failed to fetch payments');
                }
                const data = await response.json();
                setTransaction(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    console.log(transaction)
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    return (
        <>
            <div className='w-full mt-20 h-screen'>
                <div className='mx-10 bg-white shadow-2xl py-20'>
                    <div className="mx-20 rounded-xl">

                        <table className={`w-full text-sm rounded-lg text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2 border-seperate`}>
                            <thead className='text-xl text-gray-900   dark:text-gray-400'>
                                <tr>
                                    <th scope="col" className='px-6 py-3 text-black'>ID</th>
                                    <th scope="col" className='px-6 py-3 text-black'>Name</th>
                                    <th scope="col" className='px-6 py-3 text-black'>Amount</th>
                                    <th scope="col" className='px-6 py-3 text-black'>Date</th>
                                </tr>
                            </thead>
                            <tbody>

                                {transaction.map((transaction, index) => (
                                    <tr key={transaction.id} className={`odd:bg-white odd:dark:bg-gray-100 even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-700`}>
                                        <th className='px-6 py-4 text-black font-bold'>{index + 1}</th>
                                        <th className='px-6 py-4 text-black font-bold'>{transaction.donorName}</th>
                                        <th className='px-6 py-4 text-black font-bold'>{transaction.amount}</th>
                                        <th className='px-6 py-4 text-black font-bold'>{formatDate(transaction.date)}</th>
                                    </tr>
                                ))}

                            </tbody>
                        </table >
                    </div>
                </div >
            </div>
        </>
    )
}

export default TransactionPage
