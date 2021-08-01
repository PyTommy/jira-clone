import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DeletedAt,
} from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

export interface UserAttributes {
  id: string
  name: string
  email: string
  password_hash: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'createdAt' | 'updatedAt'> {}

@Table({
  tableName: 'users',
})
export class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Column
  id: string

  @Column
  name: string

  @Unique
  @Column
  email: string

  @Column
  password_hash: string

  @CreatedAt
  @Column
  createdAt: Date

  @UpdatedAt
  @Column
  updatedAt: Date

  @DeletedAt
  @Column
  deletedAt: Date
}
