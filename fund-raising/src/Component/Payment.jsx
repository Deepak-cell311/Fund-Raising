import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import donate from "../assets/donate.jpg";
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

const Payment = () => {
    const { handleSubmit, register } = useForm();
    const location = useLocation();
    const [showConfetti, setShowConfetti] = useState(false);
    const [formAnimation, setFormAnimation] = useState(false);
    const navigate = useNavigate()
    const { amount } = location.state || {};

    useEffect(() => {
        // Trigger form animation on mount
        setFormAnimation(true);
    }, []);

    const formSubmit = async (data) => {
        const donationData = {
            donorName: data.name,
            amount: amount, // Use the amount from state
            date: data.date,
        };

        try {
            const response = await fetch('https://fund-raising-ird4.vercel.app/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donationData),
            });

            if (!response.ok) {
                throw new Error('Failed to process payment');
            }

            const result = await response.json();
            toast.success("Payment processed successfully!");
            setShowConfetti(true); // Show confetti on successful payment
            console.log('Payment response:', result);
            
            setTimeout(() => {
                
                navigate("/")
            }, 10000);
        } catch (error) {
            toast.error(`Payment failed: ${error.message}`);
            console.error('Payment error:', error);
        }
    };

    const onError = (errors) => {
        Object.values(errors).forEach(error => toast.error(error.message)); // Show error messages
    };

    return (
        <>
            <div className="bg-blue-100 paymentBackground min-h-screen">
                <form
                    onSubmit={handleSubmit(formSubmit, onError)}
                    className={`w-96 px-5 border-2 flex flex-col justify-center absolute bg-white right-96 mx-24 mt-3 pb-10 ${formAnimation ? 'animate-slide-up' : ''}`}
                >
                    <h1 className='py-3 shadow-2xl w-96 -mx-5 mb-10 px-4 text-3xl text-center'>Payment Information</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 relative -top-20 -right-80 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                    <img src={donate} alt="donate" className="h-40 w-full object-contain rounded-lg relative" />

                    <label htmlFor="name">Donor Name*</label>
                    <input
                        type="text"
                        {...register('name', { required: "Full name is required", minLength: { value: 2, message: "Minimum 2 characters are required" } })}
                        placeholder='Enter your full name'
                        className={`rounded-lg mt-1 mb-3 outline-none border-2 border-gray-900 py-3 px-4 focus:ring focus:ring-orange-500`}
                    />

                    <label htmlFor="date">Date*</label>
                    <input
                        type="date"
                        {...register('date', { required: "Date is required" })}
                        className={`rounded-lg mt-1 mb-3 outline-none border-2 border-gray-900 py-3 px-4 focus:ring focus:ring-orange-500`}
                    />

                    <label htmlFor="amount">Donation Amount</label>
                    <div className='flex mb-5'>
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                            ₹
                        </span>
                        <input
                            disabled
                            value={amount}
                            id="amount"
                            className="outline-none rounded-none rounded-e-lg border-2 border-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5"
                        />
                    </div>

                    <button type="submit" className={`bg-orange-500 hover:bg-cyan-600 p-3 rounded-lg mt-0 mb-3 cursor-pointer`}>Pay</button>
                </form>
                {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
            </div>
        </>
    );
};

export default Payment;
