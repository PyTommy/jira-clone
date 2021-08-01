import {
  Table,
  Column,
  Model,
  Unique,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DeletedAt,
  IsEmail,
} from 'sequelize-typescript'
import { Optional } from 'sequelize/types'

export interface MysqlUserAttributes {
  id: string
  name: string
  email: string
  password_hash: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface MysqlUserCreationAttributes
  extends Optional<
    MysqlUserAttributes,
    'createdAt' | 'updatedAt' | 'deletedAt'
  > {}

@Table({
  tableName: 'users',
})
export class MysqlUserModel extends Model<
  MysqlUserAttributes,
  MysqlUserCreationAttributes
> {
  @PrimaryKey
  @Column
  id: string

  @Column
  name: string

  @IsEmail
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
  deletedAt?: Date | null
}
