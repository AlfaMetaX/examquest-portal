
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar/Navbar';
import { BookOpen, Trophy, BarChart2, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center space-y-6 animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                High School Exam Preparation Platform
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Ace Your Exams with Confidence
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Practice with realistic exams, track your progress, and rise to the top of the leaderboards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" onClick={() => navigate('/register')} className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                  I Already Have an Account
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 bg-secondary/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold tracking-tight">Why Choose ExamQuest?</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Our platform offers everything you need to prepare for your high school exams and track your progress.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover-lift glass-card animate-slide-in [animation-delay:200ms]">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Comprehensive Exams</h3>
                <p className="text-muted-foreground">
                  Access a wide range of practice exams covering all high school subjects with varying difficulty levels.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover-lift glass-card animate-slide-in [animation-delay:400ms]">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Performance Analytics</h3>
                <p className="text-muted-foreground">
                  Track your progress over time with detailed statistics and subject-wise performance breakdowns.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover-lift glass-card animate-slide-in [animation-delay:600ms]">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Competitive Leaderboards</h3>
                <p className="text-muted-foreground">
                  Compare your scores with peers and climb the rankings to showcase your academic excellence.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 animate-fade-in">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Students Love Our Platform
                </h2>
                <p className="text-muted-foreground mb-6">
                  Join thousands of students who have improved their grades and confidence with ExamQuest.
                </p>
                <div className="bg-secondary/50 p-6 rounded-lg border border-border">
                  <p className="italic mb-4">
                    "ExamQuest helped me prepare for my final exams with realistic practice tests. I improved my scores by 15% and got into my dream university!"
                  </p>
                  <div className="font-medium">Sarah M. - High School Senior</div>
                </div>
              </div>
              
              <div className="order-1 md:order-2 animate-fade-in">
                <div className="rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary">87%</div>
                    <p className="text-lg text-muted-foreground">of students improved their grades</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container mx-auto max-w-3xl text-center animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to Ace Your Exams?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join ExamQuest today and start your journey to academic success. Create an account to access all our features.
            </p>
            <Button size="lg" onClick={() => navigate('/register')} className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="font-semibold text-xl mb-1">ExamQuest</div>
              <p className="text-sm text-muted-foreground">
                Helping students achieve academic success
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ExamQuest. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
