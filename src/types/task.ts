export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: number;
  dueTime: number;
  priority: number;
  completed: boolean;
}
