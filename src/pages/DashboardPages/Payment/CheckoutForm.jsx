import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import Loading from '../../../components/shareComponents/Loading';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
    const stripe = useStripe();
    const element = useElements()
    const { id } = useParams()
    const axiosSecure = useAxios()
    const { user } = useAuth()

    const [cardError, setCardError] = useState('')
    const navigate = useNavigate()

    const { data: parcelData = {}, error, isLoading } = useQuery({
        queryKey: ['parcel', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data
        }
    });
    if (isLoading) {
        return <Loading></Loading>
    }

    const price = parcelData.calculatedCost;
    const amountInCents = price * 100;



    const handleSubmit = async (e) => {
        e.preventDefault();
        setCardError('')
        if (!stripe || !element) {
            return;
        }

        const card = element.getElement(CardElement)
        if (!card) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })
        if (error) {
            console.log(error)
            setCardError(error.message)

        }
        else {

            console.log('payment- ', paymentMethod)
        }
        //create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amount: amountInCents
        })
        console.log(res.data)
        const clientSecret = res.data.clientSecret
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: element.getElement(CardElement),
                billing_details: {
                    name: 'Jenny Rosen',
                },
            },
        });
        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!', result);
                const paymentInfo = {
                    parcelId: id,
                    amount: price,
                    transactionId: result.paymentIntent.id,
                    currency: result.currency,
                    paymentMethod: result.paymentIntent.payment_method_types,
                    email: user.email,
                    date: new Date()
                }

                const paymentRes = await axiosSecure.post('/payments', paymentInfo)
                if (paymentRes.data.paymentInsert) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard')

                }
            }
        }


    }
    return (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
            <CardElement className='border p-4 rounded-md my-4 bg-white text-black py-4 '>

            </CardElement>
            <button className='btn btn-full w-full bg-secondary text-primary' type='submit' disabled={!stripe} >Pay {price}৳</button>
            {
                cardError && <p className='text-red-400'>{error}</p>
            }
        </form>
    );
};

export default CheckoutForm;