"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", {
                token,
            });
            console.log("Email verified", response.data);
            setVerified(true);
        } catch (error: any) {
            console.log("Email verification failed", error.response.data);
            setError(true);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length>0){
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-black">Verify Email Page</h1>
                <h2 className="text-xs font-bold mb-6 text-center text-black">{token?`${token}`:"no token"}</h2>
                {verified&&(
                    <div>
                        <h2>Email Verified</h2>
                        <Link href="/login">Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
