
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import StatisticsCard from '@/components/statistics/StatisticsCard';
import { useToast } from '@/components/ui/use-toast';

const Statistics = () => {
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
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Statistics & High Scores</h1>
            <p className="text-muted-foreground mt-2">
              Analyze your performance and compare with other students
            </p>
          </div>
          
          <StatisticsCard />
        </div>
      </main>
    </div>
  );
};

export default Statistics;
