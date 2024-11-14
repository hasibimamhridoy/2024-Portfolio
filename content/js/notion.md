# Front-End-Hooks

- useAuth ( return currentUser)
    
    Context থেকে ইউজার কে নিয়ে সেটা রিটার্ন করছে শুধু।
    
    ```jsx
    import { useContext } from "react"
    import { AuthContext } from "../providers/AuthProvider"
    
    const useAuth = () => {
        const auth = useContext(AuthContext);
        return auth;
    }
    
    export default useAuth;
    ```
    
- useAxiousSecure (Axious secure **Interceptors)**
    - সাধারণত এক্সিওস দিয়ে আমরা ডাটা ফেচ করতে পারি ।
    - কিন্তু এক্সিওস ইন্টারছেপ্টরের মাধ্যমে আমরা ভেরিফাই করতে পারি । কোন ৪০৪ বা ৪০১ বা কোন ইরর সেট করে দিয়ে কোন একশন গ্রহন করতে পারি ।
    - আমাদের যদি একাধিক রাউট ভেরিফাই করতে হয় টোকেন দিয়ে তাহলে আমরা প্রতিবার ফেচ করার সময় হেডারশের মধ্যে টোকেন ইনজেক্ট করতে হয়। সো এই সমস্যার সমাধান আমরা এই কাস্ট হুক বানায় সলভ করতে পারি । তাহলে আমাদের বার বার প্রাইভেট রাউট বা ডাটা ভেরিফাই করার জন্য টোকেন ইঞ্জেক্ট করতে হবে না। এক্সিওস এটি খুঁজে নিজেই করে দিবে ।
    
    এটি করবো যেভাবে-
    
    - প্রথমেই একটা বেজ এপিয়াই ক্রিয়েট করে নিচ্ছি আমরা । কারণ বার বার সেটি লেখার দরকার নাই প্রতিবার হিট করার সময় এবং কখনো পরিবর্তন করতে হলে একটি সেন্টারল যায়গা থেকেই যেন আমরা পরিবর্তন করতে পারি ।
    
    ```jsx
    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000', 
      });
    ```
    
    - ইউজ ইফেক্টের ভিতরে আমরা কাজ গুলো করবো।
    - আমরা axious secure নামে যেই বেজ টা বানিয়েছি সেটার ভিতরে আমরা intercepts করবো।এবং সেটা রিকুয়েস্ট এর মধ্যে। এবং ইউজ করবো। তারপরে সেটা আমাদের একটি কনফিগ ফাইল দিবে এবং আমরা সেই কনফিগ ফাইলের ভিতরের হেডারসের মধ্যেই অথোরাইজেশনটি সেট করে দিব ।
    - আমরা চেক করে দেখবো যদি টোকেন থাকে তাহলেই আমরা সেটা সেভ করবো।এন্ড কনফিগটা রিটার্ন করে দিব ।
    - একই ভাবে আমরা সকল রেসপন্স এ এটি ইঞ্জেক্ট করবো এবং চেক করবো কোন ৪০৪ বা ইরর কোড আছে কিনা ।যদি থাকে তাহলে আমরা নেভিগেট করে দিব লগিনের মধ্যে ।সাথে লগআউট।
    
    ```jsx
    import { useEffect } from 'react';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';
    import useAuth from './useAuth';
    
    const useAxiosSecure = () => {
      const { logOut } = useAuth(); 
      const navigate = useNavigate(); 
    
      const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000', 
      });
    
      useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
          const token = localStorage.getItem('access-token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        });
    
        axiosSecure.interceptors.response.use(
          (response) => response,
          async (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
              await logOut();
              navigate('/login');
            }
            return Promise.reject(error);
          }
        );
      }, [logOut, navigate, axiosSecure]);
    
      return [axiosSecure];
    };
    
    export default useAxiosSecure;
    ```
    
- useFetchData (React Query Or **TanStack Query)**
    
    রিয়েক্ট কুয়েরি আমাদের বিল্ড ইন কিছু পাওয়ার দিয়ে দেয়। যেমন রিফেচ দেয় ইস লোডিং দেয় আবার ফেচ করা ডাটা টাও দিয়ে দেয় । ব্যবহার করার জন্য 
    
    ১। ইউজ কুরিয়ে নিব।
    
    ২। সেটা একটা অবজেক্ট এসপেক্ট করে ।
    
    ৩। সেই অব্জেক্ট এর ভিতর দুইটা জিনিষ যায়।
    
    - কুয়েরি কিঃ নাম এবং ইমেইলটা ইউজারের
    - একটি এনিস্ক্রোনাস ফেচ করা ফাকশন। এখানে আমরা বিল্ড ইন এক্সিওস কাস্টম হোকটি ইউজ করেছি । যা উপরের লিসনে আমরা শিখেছি ।
    
    ৪। ফেচ থেকে রিটার্ন পাওয়া ডাটা গুলো হুক রিটার্ন এ পাঠায় দিব । 
    
    ```jsx
    import { useQuery } from '@tanstack/react-query'
    import useAxiosSecure from './useAxiosSecure';
    import useAuth from './useAuth';
    const useCart = () => {
        const { user, loading } = useAuth();
        // const token = localStorage.getItem('access-token');
        const [axiosSecure] = useAxiosSecure();
        const { refetch, data: cart = [] } = useQuery({
            queryKey: ['carts', user?.email],
            enabled: !loading,
            // queryFn: async () => {
            //     const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, { headers: {
            //         authorization: `bearer ${token}`
            //     }})
            //     return res.json();
            // },
            queryFn: async () => {
                const res = await axiosSecure(`/carts?email=${user?.email}`)
                console.log('res from axios', res)
                return res.data;
            },
        })
    
        return [cart, refetch]
    
    }
    export default useCart;
    ```
    
- useAdminFetchData (React Query Or **TanStack Query)**
    
    **এখানে ইউজার টি এডমিন কিনা এটা চেক করা হচ্ছে।** 
    
    রিয়েক্ট কুয়েরি আমাদের বিল্ড ইন কিছু পাওয়ার দিয়ে দেয়। যেমন রিফেচ দেয় ইস লোডিং দেয় আবার ফেচ করা ডাটা টাও দিয়ে দেয় । ব্যবহার করার জন্য 
    
    ১। ইউজ কুরিয়ে নিব।
    
    ২। সেটা একটা অবজেক্ট এসপেক্ট করে ।
    
    ৩। সেই অব্জেক্ট এর ভিতর দুইটা জিনিষ যায়।
    
    - কুয়েরি কিঃ নাম এবং ইমেইলটা ইউজারের
    - একটি এনিস্ক্রোনাস ফেচ করা ফাকশন। এখানে আমরা বিল্ড ইন এক্সিওস কাস্টম হোকটি ইউজ করেছি । যা উপরের লিসনে আমরা শিখেছি ।
    
    ৪। ফেচ থেকে রিটার্ন পাওয়া ডাটা গুলো হুক রিটার্ন এ পাঠায় দিব । 
    
    ```jsx
    import { useQuery } from "@tanstack/react-query";
    import useAuth from "./useAuth";
    import useAxiosSecure from "./useAxiosSecure";
    
    const useAdmin = () => {
        const {user} = useAuth();
        const [axiosSecure] = useAxiosSecure();
        const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
            queryKey: ['isAdmin', user?.email],
            queryFn: async () => {
                const res = await axiosSecure.get(`/users/admin/${user?.email}`);
                console.log('is admin response', res)
                return res.data.admin;
            }
        })
        return [isAdmin, isAdminLoading]
    }
    export default useAdmin;
    ```
    

Layout and Homepage :  10

Login & Registration systems : 6

Add a Services (PRIVATE) : 8

All Services Page : 5

SingleServicedetails(PRIVATE) : 8

8. Manage Services (PRIVATE) : 9

Booked Service (PRIVATE) : 4

Challenges : 10