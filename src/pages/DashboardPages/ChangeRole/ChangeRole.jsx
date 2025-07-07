import React, { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ChangeRole = () => {
    const axiosSecure = useAxios();
    const [searchEmail, setSearchEmail] = useState("");
    const { data: userInfo={} , refetch, isFetching } = useQuery({
        queryKey: ['searchUser', searchEmail],
        enabled: !!searchEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${searchEmail}`)
            return res.data
        }
    })
    const { data: admins = [], refetch: refetchTable } = useQuery({
        queryKey: ['admins'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/admins');
            return res.data;
        }
    });

    const handleMakeAdmin = async () => {
        if (!userInfo) {
            return
        }
        const confirm = await Swal.fire({
            title: `Make ${userInfo.email} an Admin?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Promote",
        });

        if (confirm.isConfirmed) {
            const updatedDoc = { email: userInfo.email, status: "admin" }
            const res = await axiosSecure.patch(`/users`, updatedDoc);
            if (res.data.modifiedCount) {
                Swal.fire("Success", "User promoted to admin!", "success");
                setSearchEmail(""); // reset search
                refetchTable()
            }
        }
    };
    const handleDeleteAdmin = async (email) => {
        const confirm = await Swal.fire({
            title: "Remove Admin?",
            text: "Are you sure you want to revoke admin privileges?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, remove",
            cancelButtonText: "Cancel"
        });

        if (confirm.isConfirmed) {
            try {
                const updatedDoc = {email, status:"user"}
                await axiosSecure.patch(`/users`,updatedDoc);
                Swal.fire("Removed!", "Admin access has been revoked.", "success");
                refetchTable();
            } catch (error) {
                Swal.fire("Error", "Something went wrong.", "error");
            }
        }
    };



    return (
        <div className="max-w-xl mx-auto p-6 bg-base-100 shadow rounded-xl">
            <h2 className="text-xl font-bold mb-4">Make Admin</h2>

            <input
                type="text"
                className="input input-bordered w-full mb-4"
                placeholder="Search by email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                onBlur={refetch}
            />

            {userInfo ? (
                <div className="space-y-2 p-4 border rounded bg-base-200">
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Role:</strong> {userInfo.role || "user"}</p>
                    <button className="btn btn-success btn-sm" onClick={handleMakeAdmin}>
                        Make Admin
                    </button>
                </div>
            ) : !userInfo ? (
                <p className="text-error">No user found.</p>
            ) : null}
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin, index) => (
                        <tr key={admin._id}>
                            <td>{index + 1}</td>
                            <td>{admin.email}</td>
                            <td><span className="badge badge-primary">{admin.role}</span></td>
                            <td>
                                <button
                                    onClick={() => handleDeleteAdmin(admin.email)}
                                    className="btn btn-xs btn-error"
                                >
                                    Delete Admin
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    );
};

export default ChangeRole;