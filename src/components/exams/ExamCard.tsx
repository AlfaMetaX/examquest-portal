
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ExamCardProps {
  id: number;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  questions: number;
  participants: number;
  className?: string;
}

const ExamCard: React.FC<ExamCardProps> = ({
  id,
  title,
  description,
  subject,
  difficulty,
  duration,
  questions,
  participants,
  className,
}) => {
  const navigate = useNavigate();
  
  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-amber-100 text-amber-800',
    hard: 'bg-red-100 text-red-800',
  };
  
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="secondary" className="mb-2">{subject}</Badge>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-1.5">{description}</CardDescription>
          </div>
          <Badge className={cn(difficultyColor[difficulty])}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center text-sm text-muted-foreground gap-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{questions} questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{participants} participants</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 pt-4">
        <Button variant="default" className="w-full" onClick={() => navigate(`/exams/${id}`)}>
          Start Exam
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExamCard;
