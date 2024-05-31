
export interface Task {
    id: number;
    projectId:number;
    name: string;
    description: string;
    assignedBy:number;
    assignedTo: number;
    priority: string;
    status: string;
    startDate: Date;
    dueDate: Date;
    completedDate: Date | null;

  }