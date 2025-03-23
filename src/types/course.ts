export interface Unit {
  id: number;
  title: string;
  description: string;
  order: number;
  contents: Content[];
}

export interface Content {
  id: number;
  title: string;
  description: string;
  type: 'page' | 'assignment';
  order: number;
  unitId: number;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  units: Unit[];
  createdAt: string;
  updatedAt: string;
  instructor: string;
  status: string;
}

export interface Assignment extends Content {
  type: 'assignment';
  dueDate: string;
  maxScore: number;
  submissions: AssignmentSubmission[];
}

export interface AssignmentSubmission {
  id: number;
  studentId: number;
  assignmentId: number;
  content: string;
  files?: string[];
  score?: number;
  feedback?: string;
  submittedAt: string;
} 