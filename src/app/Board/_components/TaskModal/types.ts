import type { ITask } from "@/app/board/_components/Task/types"
import type { Dispatch, SetStateAction } from "react"

export interface ITaskModalComponent {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleCreateTask?: (task: ITask) => void
  handleUpdateTask?: (task: ITask, index: number) => void
  handleDeleteTask?: (index: number) => void
  taskToUpdate?: ITask
  index?: number
}