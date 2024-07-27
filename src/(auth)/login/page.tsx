'use client'
import { useAuthStore } from '@/store/Auth'
import React, {useState} from 'react'

export default function LoginPage() {

    const {login} = useAuthStore();
    const[isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState("");

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if(!email || !password){
            setError(() => "All fields are required!");
        }

        setIsLoading(true);
        setError("");


        const loginResponse = await login(email, password);
        if(!loginResponse.error){
            setError(loginResponse.error!.message);
        }

        setIsLoading(false);
    }

  return (
    <div>LoginPage</div>
  )
}
