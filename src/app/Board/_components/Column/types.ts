import type { ITask } from "@/app/Board/_components/Task/types"

export interface IColumnComponent {
  id: string
  role: 'A fazer' | 'Fazendo' | 'Feito'
  taskList?: ITask[]
  description?: string
  handleUpdateTask?: (task: ITask, index: number) => void
  handleDeleteTask?: (index: number) => void
}