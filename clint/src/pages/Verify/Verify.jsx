import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
       const [searchParams,setSearchParams]=useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "api/order/verify", { success, orderId });
            if (response.data.success) {
                navigate("/myorder");
            } else {
                navigate("/error");
            }
        } catch (error) {
            console.log(error.message);
            navigate("/error");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-700">Verifying your payment...</p>
        </div>
    )
}

export default Verify;
