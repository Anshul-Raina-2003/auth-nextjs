'use client';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import React from 'react';
export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = React.useState('nothing');
    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            console.log("Logout successful");
            router.push('/login');
        }
        catch (error: any) {
            console.log("Logout failed", error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        try {
            const response = await axios.get('/api/users/me');
            console.log("User details", response.data);
            setData(response.data.data._id );
        } catch (error: any) {
            console.log("Failed to get user details", error.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-black">Profile Page</h1>
                <hr className="mb-6"/>
                <h2 className='text-black '>{data==='nothing'?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
                <hr className="mb-6"/>
                <div className="flex justify-center space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={logout}>Logout</button>
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-700" onClick={getUserDetails}>Get User Details</button>
                </div>
            </div>
        </div>
    )}