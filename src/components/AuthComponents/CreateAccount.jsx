import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const CreateAccount = () => {
    const { createAccount } = use(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const onSubmit = data => {
        console.log(data)
        const {email, password}= data
        createAccount(email, password)
            .then(res => {
                console.log(res.user)
                navigate('/')
            })
        .catch(error=> console.log(error))

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
                            {...register('name',{required:true, minLength:6})}
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
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input
                            type="text"
                            placeholder="imgbb.image.png"
                            {...register('photoURL')}
                            className="input input-bordered w-full"
                        />
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