
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, BarChart2, Trophy, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Fake data for display purposes
const recentExams = [
  { id: 1, title: 'Algebra Fundamentals', score: 85, totalQuestions: 20, completedQuestions: 20, date: '2 days ago' },
  { id: 2, title: 'Calculus Basics', score: 75, totalQuestions: 15, completedQuestions: 15, date: '1 week ago' },
  { id: 3, title: 'Geometry Concepts', score: 90, totalQuestions: 25, completedQuestions: 25, date: '2 weeks ago' },
];

const upcomingExams = [
  { id: 4, title: 'Chemistry Principles', totalQuestions: 30, estimatedTime: '45 min' },
  { id: 5, title: 'Physics Mechanics', totalQuestions: 25, estimatedTime: '40 min' },
  { id: 6, title: 'Biology Fundamentals', totalQuestions: 35, estimatedTime: '50 min' },
];

const highScores = [
  { id: 1, name: 'Alex Johnson', score: 98, exam: 'Algebra Fundamentals' },
  { id: 2, name: 'Emma Williams', score: 96, exam: 'Calculus Basics' },
  { id: 3, name: 'Michael Brown', score: 94, exam: 'Geometry Concepts' },
];

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState('Student');
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);
  
  return (
    <div className="container py-8 space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}</h1>
        <p className="text-muted-foreground">
          Track your progress, take exams, and improve your scores
        </p>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="exams" className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Exams</span>
          </TabsTrigger>
          <TabsTrigger value="highscores" className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4" />
            <span>High Scores</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Total Exams Taken</CardTitle>
                <CardDescription>Your exam activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-xs text-muted-foreground mt-1">+3 from last month</p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Average Score</CardTitle>
                <CardDescription>Across all exams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">83%</div>
                <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Best Subject</CardTitle>
                <CardDescription>Your strongest area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">Mathematics</div>
                <p className="text-xs text-muted-foreground mt-1">92% average score</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recently completed exams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentExams.map((exam) => (
                  <div key={exam.id} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{exam.title}</p>
                        <span className="text-sm text-muted-foreground">{exam.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <span>Score: {exam.score}%</span>
                          <span>•</span>
                          <span>{exam.completedQuestions}/{exam.totalQuestions} questions</span>
                        </div>
                        <Button variant="link" size="sm" className="h-auto p-0" onClick={() => navigate(`/exams/${exam.id}`)}>
                          View Results
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="exams" className="space-y-4">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Upcoming Exams</CardTitle>
              <CardDescription>Recommended exams based on your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{exam.title}</p>
                        <span className="text-sm flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {exam.estimatedTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{exam.totalQuestions} questions</span>
                        <Button size="sm" onClick={() => navigate(`/exams/${exam.id}`)}>
                          Start Exam
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full" onClick={() => navigate('/exams')}>
                  View All Exams
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Subject-wise examination progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Mathematics</span>
                    <span>12/15 exams</span>
                  </div>
                  <Progress value={80} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Science</span>
                    <span>8/12 exams</span>
                  </div>
                  <Progress value={66} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">History</span>
                    <span>5/10 exams</span>
                  </div>
                  <Progress value={50} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">English</span>
                    <span>7/8 exams</span>
                  </div>
                  <Progress value={87} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="highscores" className="space-y-4">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top performers across all exams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {highScores.map((score, index) => (
                  <div key={score.id} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <span className="font-bold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{score.name}</p>
                        <span className="font-bold text-primary">{score.score}%</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{score.exam}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full" onClick={() => navigate('/statistics')}>
                  View Complete Rankings
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Milestones and badges earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <div className="text-center space-y-2">
                  <Trophy className="h-16 w-16 mx-auto text-primary" />
                  <h3 className="font-medium">Top 10% in Mathematics</h3>
                  <p className="text-sm text-muted-foreground">Keep going to unlock more achievements!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
