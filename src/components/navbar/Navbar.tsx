
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BookOpen, BarChart2, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
  requiresAuth: boolean;
};

const navItems: NavItem[] = [
  {
    name: 'Home',
    path: '/',
    icon: BookOpen,
    requiresAuth: false,
  },
  {
    name: 'Exams',
    path: '/exams',
    icon: BookOpen,
    requiresAuth: true,
  },
  {
    name: 'Statistics',
    path: '/statistics',
    icon: BarChart2,
    requiresAuth: true,
  },
];

const authItems: NavItem[] = [
  {
    name: 'Login',
    path: '/login',
    icon: LogIn,
    requiresAuth: false,
  },
  {
    name: 'Register',
    path: '/register',
    icon: UserPlus,
    requiresAuth: false,
  },
];

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // For demo purposes - in a real app, you'd check authentication status properly
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  // Listen for scroll events to add shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        isScrolled ? "backdrop-blur-lg bg-background/80 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            ExamQuest
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems
            .filter(item => !item.requiresAuth || (item.requiresAuth && isAuthenticated))
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors",
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))}
          
          <div className="h-6 w-px bg-border mx-2"></div>
          
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium flex items-center gap-1.5"
              onClick={() => {
                localStorage.removeItem('authToken');
                setIsAuthenticated(false);
                closeMenu();
              }}
            >
              <LogIn className="w-4 h-4" />
              Logout
            </Button>
          ) : (
            authItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors",
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background/90 backdrop-blur-md z-40 animate-fade-in">
          <nav className="container px-4 mx-auto py-8 flex flex-col gap-2">
            {navItems
              .filter(item => !item.requiresAuth || (item.requiresAuth && isAuthenticated))
              .map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-3 rounded-md text-base font-medium flex items-center gap-2",
                      isActive 
                        ? "text-primary bg-primary/5" 
                        : "text-foreground/70 hover:bg-secondary"
                    )
                  }
                  onClick={closeMenu}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              ))}
            
            <div className="h-px bg-border my-2"></div>
            
            {isAuthenticated ? (
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-3 text-base font-medium flex items-center gap-2"
                onClick={() => {
                  localStorage.removeItem('authToken');
                  setIsAuthenticated(false);
                  closeMenu();
                }}
              >
                <LogIn className="w-5 h-5" />
                Logout
              </Button>
            ) : (
              authItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-3 rounded-md text-base font-medium flex items-center gap-2",
                      isActive 
                        ? "text-primary bg-primary/5" 
                        : "text-foreground/70 hover:bg-secondary"
                    )
                  }
                  onClick={closeMenu}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              ))
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
