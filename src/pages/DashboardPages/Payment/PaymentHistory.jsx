import React from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/shareComponents/Loading';
import useAuth from '../../../hooks/useAuth';

const PaymentHistory = () => {
  const axiosSecure = useAxios();
  const{user}=useAuth()
    const { data: paymentHistory=[] , isLoading} = useQuery({
        queryKey: ['payments-history'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            
            return res.data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(paymentHistory)
    return (
        <div className="overflow-x-auto rounded-xl shadow border border-base-300">
      <table className="table table-zebra table-sm lg:table-md">
        <thead className="bg-base-200 text-base font-semibold">
          <tr>
            <th>#</th>
            <th>Transaction ID</th>
            <th>Amount (৳)</th>
            <th>Payment Method</th>
            <th>Email</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory?.map((payment, index) => (
            <tr key={payment._id}>
              <th>{index + 1}</th>
              <td className="text-xs break-all">{payment.transactionId}</td>
              <td>৳{payment.amount}</td>
              <td>{payment.paymentMethod?.join(", ")}</td>
              <td className="text-xs">{payment.email}</td>
              <td>{new Date(payment.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default PaymentHistory;