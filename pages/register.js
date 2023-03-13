import Layout from '@/components/Layout'
import React, { useEffect } from 'react'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import Link from 'next/link'
import {useSession, signIn} from 'next-auth/react'
import { toast } from 'react-toastify'
import { getError } from '@/utils/error'
import axios from 'axios'


export default function register() {
    const {data: session} = useSession()

    const router = useRouter()
    const {redirect} = router.query

    useEffect(() => {
        if(session?.user) {
            router.push(redirect || '/')
        }

    }, [router, session, redirect])

    const {register, handleSubmit, getValues, formState: {errors}} = useForm()
    const sumbitHandler = async ({ name, email, password}) => {
        try {
            await axios.post('/api/auth/signup', {name, email, password});
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            })
            if(result.error) {
                toast.error(getError(result.error))
            }
        }catch(err) {
            toast.error(getError(err))
        }
    }

  return (
    <Layout title="Create an Account">
        <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(sumbitHandler)}>
            <h1 className="mb-4 text-xl">Create an Account</h1>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">Name</label>
                <input type="text" id="name" {...register('name', {required: "Please enter name"})} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent" />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                <input type="email" id="email" {...register('email', {required: "Please enter email", pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',}})} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent" />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                <input type="password" id="password" {...register('password', {required: "Please enter password", minLength: {value: 6, message: 'Password must be at least 6 characters'}})} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent" />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
                <input type="password" id="confirmPassword" {...register('confirmPassword', {required: "Please enter confirm password", validate: (value) => value === getValues('password') || 'Passwords do not match'})} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent" />
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
                {errors.confirmPassword && errors.confirmPassword.type === 'validate' && <p className="text-xs text-red-500">Password do not match</p>}
            </div>
            <div className="mb-4">
                <button type="submit" className="primary-button">Register</button>
            </div>
            <div className='mb-4'>
                Do you have an account? &nbsp <Link href={`/login?direct=${redirect || '/'}`}>Sign In</Link>
            </div>
        </form>
    </Layout>
  )
}
