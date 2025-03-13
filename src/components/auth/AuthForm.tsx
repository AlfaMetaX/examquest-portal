
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthFormProps {
  type: 'login' | 'register';
  className?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, className }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (type === 'register' && !name)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate authentication request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just set a token in localStorage
      localStorage.setItem('authToken', 'demo-token');
      localStorage.setItem('userName', type === 'register' ? name : 'User');
      
      toast({
        title: type === 'login' ? "Welcome back!" : "Account created",
        description: type === 'login' 
          ? "You've successfully logged in." 
          : "Your account has been created successfully.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            {type === 'login' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-muted-foreground">
            {type === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Enter your information to create an account'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
                className="focus-ring"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className="focus-ring"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {type === 'login' && (
                <Button variant="link" size="sm" className="px-0 h-auto font-normal">
                  Forgot password?
                </Button>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              className="focus-ring"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {type === 'login' ? "Don't have an account? " : "Already have an account? "}
            <Button 
              variant="link" 
              className="p-0 h-auto font-normal"
              onClick={() => navigate(type === 'login' ? '/register' : '/login')}
            >
              {type === 'login' ? 'Sign up' : 'Sign in'}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
