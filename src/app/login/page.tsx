'use client';
import React from 'react';
import Link from 'next/link';
import axios from 'axios'; 
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: '',
        email: '',
        password: ''
    });
    
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log("Login successful", response.data);
            toast.success("Login successful");
            router.push('/profile');
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email && user.password && user.username){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user]) 

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login Page</h1>
                <hr className="mb-6"/>
                <div className="mb-4">
                    <label htmlFor='email' className="block text-gray-700 font-bold mb-2">Email</label>
                    <input id='email' type='text' value={user.email} onChange={
                        (event) => setUser({...user, email: event.target.value})
                    } placeholder='Email' className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"/>
                </div>
                <div className="mb-6">
                    <label htmlFor='password' className="block text-gray-700 font-bold mb-2 ">Password</label>
                    <input id='password' type='text' value={user.password} onChange={
                        (event) => setUser({...user, password: event.target.value})
                    } placeholder='Password' className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"/>
                </div>
                <button onClick={onLogin} className="w-full bg-blue-500 text-black py-2 rounded hover:bg-blue-600 transition duration-200">Sign Up</button>
                <Link href="/signup" className="block text-center mt-4 text-blue-500 hover:text-blue-600">Don't have an account? Signup here.
                </Link>
            </div>
        </div>
    )
}