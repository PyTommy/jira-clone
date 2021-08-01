export interface UserAttributes {
  id: string
  name: string
  email: string
  createdAt: number
  updatedAt: number
  deleted: boolean
  deletedAt?: number
}
