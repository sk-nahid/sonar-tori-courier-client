import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const { logIn } = use(AuthContext)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const axiosInstance = useAxiosInstance()
    const onSubmit = data => {
        console.log(data)
        const { email, password } = data
        console.log(email, password)
        logIn(email, password)
            .then(async (res) => {
                console.log(res.user)
                const userinfo = {
                    email,
                    role: "user",
                    createdAt: new Date().toISOString(),
                    lastLoginAt: res.user.metadata.lastSignInTime
                }

                const userRes = await axiosInstance.post('/users', userinfo)
                console.log(userRes.data)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
            .catch(error => {
                // console.log(error.message)
                toast.error(error.message)
            })
    }
    return (
        <div className="flex-grow flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="mb-6 text-base-content/70">Login to your account</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            {...register('email')}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="•••••••"
                            {...register('password')}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control mt-4">
                        <button className="btn btn-primary w-full">Login</button>
                    </div>

                </form>

                <p className="mt-4 text-sm text-center">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-primary hover:underline">
                        Register
                    </Link>
                </p>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;