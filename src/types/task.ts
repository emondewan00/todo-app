export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: number;
  dueTime: number;
  priority: number;
  completed: boolean;
}

export interface TaskSection {
  title: string;
  data: Task[];
}

export interface TasksState {
  tasks: TaskSection[];
  readonly renderAbleTasks: TaskSection[];
  searchTerm: string;
 taskCount: number;
}
