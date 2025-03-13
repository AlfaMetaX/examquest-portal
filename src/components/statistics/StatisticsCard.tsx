
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { Trophy, Users, BookOpen } from 'lucide-react';

// Fake data for display purposes
const subjectData = [
  { name: 'Mathematics', score: 86 },
  { name: 'Science', score: 78 },
  { name: 'History', score: 65 },
  { name: 'English', score: 72 },
];

const timeData = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 68 },
  { name: 'Mar', score: 72 },
  { name: 'Apr', score: 75 },
  { name: 'May', score: 82 },
  { name: 'Jun', score: 86 },
];

const pieData = [
  { name: 'Correct', value: 76 },
  { name: 'Incorrect', value: 24 },
];

const COLORS = ['#3b82f6', '#f43f5e', '#10b981', '#f59e0b'];
const PERFORMANCE_COLORS = ['#10b981', '#f43f5e'];

const topStudents = [
  { id: 1, name: 'Alex Johnson', score: 98, examsCompleted: 42 },
  { id: 2, name: 'Emma Williams', score: 96, examsCompleted: 38 },
  { id: 3, name: 'Michael Brown', score: 94, examsCompleted: 45 },
  { id: 4, name: 'Sophia Martinez', score: 92, examsCompleted: 36 },
  { id: 5, name: 'William Taylor', score: 91, examsCompleted: 40 },
];

const StatisticsCard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
      <Card className="lg:col-span-3 hover-lift">
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
          <CardDescription>Your examination performance across subjects and time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="subjects">
            <TabsList className="mb-4">
              <TabsTrigger value="subjects">By Subject</TabsTrigger>
              <TabsTrigger value="time">Over Time</TabsTrigger>
            </TabsList>
            
            <TabsContent value="subjects" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Score']}
                    labelStyle={{ color: 'var(--foreground)' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)' 
                    }}
                  />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="time" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Average Score']}
                    labelStyle={{ color: 'var(--foreground)' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)' 
                    }}
                  />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle>Correct vs. Incorrect</CardTitle>
          <CardDescription>Overall answer distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PERFORMANCE_COLORS[index % PERFORMANCE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip
                  formatter={(value) => [`${value}%`, '']}
                  labelStyle={{ color: 'var(--foreground)' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-4 hover-lift">
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
          <CardDescription>Students with the highest average scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {topStudents.map((student, index) => (
              <Card key={student.id} className={index === 0 ? "border-primary bg-primary/5" : ""}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <Badge color="primary" className="w-6 h-6 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                      {index + 1}
                    </Badge>
                    {index === 0 && <Trophy className="h-5 w-5 text-primary" />}
                  </div>
                  <CardTitle className="text-base mt-2">{student.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>Rank #{index + 1}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{student.examsCompleted} exams</span>
                  </div>
                  <div className="text-lg font-bold mt-2">{student.score}%</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Add Badge component to address missing reference
const Badge: React.FC<any> = ({ children, className, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default StatisticsCard;
