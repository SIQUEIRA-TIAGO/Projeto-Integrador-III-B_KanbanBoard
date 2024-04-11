export interface ITask {
  id: string
  description: string
  member?: string
  deadLine?: string
  priority?: 1 | 2 | 3 | 4
}

export interface ITaskComponent {
  task: ITask
  index: number
  handleUpdateTask?: (task: ITask, index: number) => void
  handleDeleteTask?: (index: number) => void
}