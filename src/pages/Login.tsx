
import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md animate-scale-in">
          <AuthForm type="login" />
        </div>
      </main>
    </div>
  );
};

export default Login;
