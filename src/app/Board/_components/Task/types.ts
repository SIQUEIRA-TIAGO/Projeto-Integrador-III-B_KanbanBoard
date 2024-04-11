export interface ITask {
  id: string
  description: string
  member?: string
  deadLine?: string
  priority?: 1 | 2 | 3 | 4
}