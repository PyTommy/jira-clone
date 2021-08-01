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
  Default,
} from 'sequelize-typescript'

export interface MysqlUserAttributes {
  id: string
  name: string
  email: string
  password_hash: string
  createdAt: Date
  updatedAt: Date
  deleted: boolean
  deletedAt?: Date
}

export interface MysqlUserCreationAttributes
  extends Omit<
    MysqlUserAttributes,
    'createdAt' | 'updatedAt' | 'deletedAt' | 'deleted'
  > {}

export interface MysqlUserUpdationAttributes
  extends Omit<
    MysqlUserAttributes,
    'createdAt' | 'updatedAt' | 'deletedAt' | 'deleted' | 'password_hash'
  > {}

export interface MysqlUserUpdationAttributes
  extends Omit<
    MysqlUserAttributes,
    'createdAt' | 'updatedAt' | 'deletedAt' | 'deleted' | 'password_hash'
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

  @Default(false)
  @Column
  deleted: boolean

  @DeletedAt
  @Column
  deletedAt?: Date | null
}
