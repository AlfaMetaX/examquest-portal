
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter } from 'lucide-react';
import ExamCard from './ExamCard';

// Fake data for display purposes
const mockExams = [
  {
    id: 1,
    title: 'Algebra Fundamentals',
    description: 'Core concepts in algebra including equations, functions, and inequalities.',
    subject: 'Mathematics',
    difficulty: 'medium' as const,
    duration: '45 min',
    questions: 20,
    participants: 1245,
    category: 'mathematics',
  },
  {
    id: 2,
    title: 'Calculus Basics',
    description: 'Introduction to derivatives, integrals, and limits.',
    subject: 'Mathematics',
    difficulty: 'hard' as const,
    duration: '60 min',
    questions: 15,
    participants: 987,
    category: 'mathematics',
  },
  {
    id: 3,
    title: 'Geometry Concepts',
    description: 'Exploration of shapes, angles, and spatial relationships.',
    subject: 'Mathematics',
    difficulty: 'easy' as const,
    duration: '30 min',
    questions: 25,
    participants: 1532,
    category: 'mathematics',
  },
  {
    id: 4,
    title: 'Chemistry Principles',
    description: 'Fundamentals of atoms, molecules, and chemical reactions.',
    subject: 'Science',
    difficulty: 'medium' as const,
    duration: '45 min',
    questions: 30,
    participants: 876,
    category: 'science',
  },
  {
    id: 5,
    title: 'Physics Mechanics',
    description: 'Study of motion, forces, and energy.',
    subject: 'Science',
    difficulty: 'hard' as const,
    duration: '60 min',
    questions: 25,
    participants: 754,
    category: 'science',
  },
  {
    id: 6,
    title: 'Biology Fundamentals',
    description: 'Introduction to cells, genetics, and living organisms.',
    subject: 'Science',
    difficulty: 'easy' as const,
    duration: '40 min',
    questions: 35,
    participants: 1289,
    category: 'science',
  },
  {
    id: 7,
    title: 'World History',
    description: 'Survey of major historical events and civilizations.',
    subject: 'History',
    difficulty: 'medium' as const,
    duration: '50 min',
    questions: 40,
    participants: 643,
    category: 'history',
  },
  {
    id: 8,
    title: 'Literature Analysis',
    description: 'Critical examination of literary works and themes.',
    subject: 'English',
    difficulty: 'medium' as const,
    duration: '55 min',
    questions: 30,
    participants: 892,
    category: 'english',
  },
];

const ExamList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredExams = mockExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === 'all' || exam.difficulty === difficultyFilter;
    const matchesSubject = subjectFilter === 'all' || exam.subject.toLowerCase() === subjectFilter.toLowerCase();
    const matchesTab = activeTab === 'all' || exam.category === activeTab;
    
    return matchesSearch && matchesDifficulty && matchesSubject && matchesTab;
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exams..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="w-40">
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-40">
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <ExamCard 
                key={exam.id}
                id={exam.id}
                title={exam.title}
                description={exam.description}
                subject={exam.subject}
                difficulty={exam.difficulty}
                duration={exam.duration}
                questions={exam.questions}
                participants={exam.participants}
                className="h-full"
              />
            ))}
          </div>
          
          {filteredExams.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No exams found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
        
        {/* The other tabs will automatically show filtered content based on the activeTab state */}
        <TabsContent value="mathematics" className="mt-0" />
        <TabsContent value="science" className="mt-0" />
        <TabsContent value="history" className="mt-0" />
        <TabsContent value="english" className="mt-0" />
      </Tabs>
    </div>
  );
};

export default ExamList;
