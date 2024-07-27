'use client'

import { useAuthStore } from '@/store/Auth'
import React, { useState, useEffect } from 'react'


export default function RegisterPage() {
    const { createAccount, login } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        //collect data
        const formData = new FormData(e.currentTarget);
        const firstName = formData.get('firstName') as string || null;
        const lastName = formData.get('lastName') as string || null;
        const email = formData.get('email') as string || null;
        const password = formData.get('password') as string || null;

        //validate
        if([firstName, lastName, email, password].some(field => field === null || field === "")){
            setError(() => "Please fill out all the details");
            return
        }

        //call the store
        setIsLoading(true);
        setError("");
        const response = await createAccount(`${firstName} ${lastName}`, email!, password!);
        if(response.error){
            setError(() => response.error!.message)
        } else {
            const loginResponse =  await login(email!, password!);
            if(loginResponse.error){
                setError(() => loginResponse.error!.message);
            }
        }  
        
        setIsLoading(() => false);
    }

    return (
       <div>
        {error && (
            <p>{error}</p>
        )}
        <form onSubmit={handleSubmit}>
            
        </form>
       </div>
    )
}
