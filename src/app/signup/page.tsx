'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import axios from 'axios'; 
import toast from 'react-hot-toast';

export default function SignupPage() {
    const router = useRouter();
    
    const [user, setUser] = React.useState({
        username: '',
        email: '',
        password: ''
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log("Signup success", response.data);
            router.push('/login');
        } catch (error : any) {
            console.log('Signup failed', error.response.data.error);
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-black">{loading? "processing" : "Signup Page"}</h1>
                <hr className="mb-6"/>
                <div className="mb-4">
                    <label htmlFor='username' className="block text-black font-bold mb-2">Username</label>
                    <input id='username' type='text' value={user.username} onChange={
                        (event) => setUser({...user, username: event.target.value} )
                    } placeholder='Username' className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"/>
                </div>
                <div className="mb-4">
                    <label htmlFor='email' className="block text-black font-bold mb-2">Email</label>
                    <input id='email' type='text' value={user.email} onChange={
                        (event) => setUser({...user, email: event.target.value})
                    } placeholder='Email' className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"/>
                </div>
                <div className="mb-6">
                    <label htmlFor='password' className="block text-black font-bold mb-2">Password</label>
                    <input id='password' type='text' value={user.password} onChange={
                        (event) => setUser({...user, password: event.target.value})
                    } placeholder='Password' className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"/>
                </div>
                <button onClick={onSignup} className="w-full bg-blue-500 text-black py-2 rounded hover:bg-blue-600 transition duration-200">{buttonDisabled?'No Signup': 'Signup'}</button>
                <Link href="/login" className="block text-center mt-4 text-blue-500 hover:text-blue-600">Already have an account? Login here.
                </Link>
            </div>
        </div>
    )
}