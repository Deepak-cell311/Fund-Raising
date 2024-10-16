import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import children from "../Dashboard/assets/children.jpg";
import Confetti from 'react-confetti'; 

const DonationPage = () => {
    const { handleSubmit, register, reset } = useForm();
    const [amount, setAmount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const navigate = useNavigate();

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const formSubmit = async (data) => {
        const donationData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            referralCode: data.referralCode,
            amount: amount,
        };

        try {
            console.log('Sending donation data:', donationData);
            const response = await fetch('http://localhost:5000/api/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donationData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', response.status, errorText);
                throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
            }

            const responseData = await response.json();
            console.log('Server response:', responseData);
            toast.success("Donate for smile!");
            setShowConfetti(true); 
            reset();
            setAmount(0);
            navigate('/payment', { state: { amount } });
        } catch (error) {
            console.error('Donation error:', error);
            toast.error(`Donation failed: ${error.message}`);
        }
    };

    const onError = (errors) => {
        Object.values(errors).forEach(error => toast.error(error.message)); // Show error messages
    };

    const handleAmountChange = (newAmount) => {
        setAmount(newAmount);
    };

    useEffect(() => {
        // Logic to handle any initialization needed for the donation process
    }, []);

    return (
        <div className='bg-white shadow-2xl h-auto w-10/12 mx-auto p-5 md:p-10'>
            <span className='bg-orange-600 w-full h-12'></span>
            <h1 className='text-center text-white text-5xl bg-orange-500 py-3 -mt-10'>Give once</h1>
            {isModalOpen && (
                <div className='modal-overlay'>
                    <form
                        onSubmit={handleSubmit(formSubmit, onError)}
                        className={`w-full max-w-md mx-auto border-2 flex flex-col justify-center bg-white p-5 mt-5 shadow-lg absolute`}
                    >
                        <h1 className='py-3 shadow-2xl text-3xl text-center'>Personal Information</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer absolute top-5 right-5" onClick={handleModal}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                        <label htmlFor="name">Full Name*</label>
                        <input
                            type="text"
                            {...register('name', { required: "Full name is required", minLength: { value: 2, message: "Minimum 2 characters are required" } })}
                            placeholder='Enter your full name'
                            className={`rounded-lg mt-1 mb-3 outline-none border-2 border-gray-900 py-2 px-3 input-focus`}
                        />

                        <label htmlFor="email">Email Address*</label>
                        <input
                            type="email"
                            {...register('email', { required: "Email Address is required" })}
                            placeholder='johnDoe@gmail.com'
                            className={`rounded-lg mt-1 mb-3 outline-none border-2 border-gray-900 py-2 px-3 input-focus`}
                        />

                        <label htmlFor="phone">Phone*</label>
                        <div className="flex mb-5">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                                +91
                            </span>
                            <input {...register('phone', { required: "Phone number is required" })} type="text" className="outline-none rounded-none rounded-e-lg border-2 border-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 input-focus" placeholder="Your phone number" />
                        </div>

                        <label htmlFor="referralCode">Referral code (if available)</label>
                        <input
                            type="text"
                            {...register('referralCode')}
                            placeholder='Enter your referral code'
                            className={`rounded-lg mt-1 mb-3 outline-none border-2 border-gray-900 py-2 px-3 input-focus`}
                        />

                        <label htmlFor="amount">Donation Amount</label>
                        <div className='flex mb-5'>
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                                ₹
                            </span>
                            <input disabled value={amount} className="outline-none rounded-none rounded-e-lg border-2 border-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5" />
                        </div>

                        <button type="submit" className={`bg-orange-500 button-success p-3 rounded-lg mt-0 mb-3 cursor-pointer`}>Donate</button>
                    </form>
                </div>
            )}
            
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

            <div className='flex flex-wrap justify-center w-full'>
                {[18000, 9000, 5000, 7000, 13000, 14000].map((donationAmount, index) => (
                    <div key={index} className="flex flex-col mx-2 my-2 w-full max-w-sm border border-gray-200 rounded-lg shadow-md bg-gray-50">
                        <div className="p-5">
                            <img src={children} alt="Children" className="w-full h-40 object-cover rounded-t-lg" />
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Support a child&apos;s education for 12 months.</h5>
                            <p className="mb-3 font-normal text-gray-700">Help support a child&apos;s education and make a lasting impact on their future.</p>
                            <button
                                onClick={() => {
                                    handleAmountChange(donationAmount);
                                    handleModal(); // Open the modal when the donation button is clicked
                                }}
                                className="inline-flex flex-col items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                            >
                                <span className='flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-2 my-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                    <span className='text-lg'>Donate</span>
                                </span>
                                <span className='text-lg'>₹ {donationAmount}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationPage;
