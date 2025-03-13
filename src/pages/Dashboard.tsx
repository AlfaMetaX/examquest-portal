
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import DashboardComponent from '@/components/dashboard/Dashboard';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <DashboardComponent />
      </main>
    </div>
  );
};

export default Dashboard;
