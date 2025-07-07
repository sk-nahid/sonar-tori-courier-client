import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import useAxiosInstance from '../../hooks/useAxiosInstance';

const CreateAccount = () => {
    const [imageUrl, setImageUrl] = useState('')
    const { createAccount, userProfileUpdat } = use(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const axiosInstance = useAxiosInstance()

    const onSubmit = data => {
        console.log(data)
        const { email, password, name } = data
        createAccount(email, password)
            .then(async (res) => {
                console.log(res.user)



                const updatedData = { photoURL: imageUrl, displayName: name }
                //update name and profile picture
                userProfileUpdat(updatedData)
                    .then(async () => {
                        console.log('profile image and name updated')
                        //update user role
                        const userinfo = {
                            email,
                            role: "user",
                            createdAt: new Date().toISOString(),
                            lastLoginAt: res.user.metadata.lastSignInTime
                        }

                        const userRes = await axiosInstance.post('/users', userinfo)
                        console.log(userRes.data)
                    })
                    .catch(error => console.log(error))

                navigate('/');


            })
            .catch(error => console.log(error))

    }
    const handleSubmitPhoto = async (e) => {
        const img = e.target.files[0]
        console.log(img)
        const formData = new FormData();
        formData.append("image", img);

        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET}`, formData)

        setImageUrl(res.data.data.display_url)

    }
    return (
        <div className="flex-grow flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                <p className="mb-6 text-base-content/70">create a new account</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="your name"
                            {...register('name', { required: true, minLength: 6 })}
                            className="input input-bordered w-full"
                        />
                        {
                            errors?.name?.type === "required" && <p></p>
                        }
                        {
                            errors?.name?.type === "minLength" && <p>length error</p>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label ">
                            <span className="label-text">Photo</span>
                        </label>
                        <br />
                        <input onChange={handleSubmitPhoto} type="file" className='file-input w-full' />
                    </div>
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
        </div>
    );
};

export default CreateAccount;