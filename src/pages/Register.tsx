
import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import AuthForm from '@/components/auth/AuthForm';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md animate-scale-in backdrop-blur-sm">
          <AuthForm type="register" />
        </div>
      </main>
    </div>
  );
};

export default Register;
