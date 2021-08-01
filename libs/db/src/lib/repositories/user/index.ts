import { MysqlUserAttributes, MysqlUserModel } from '../../models'
import { IUserRepo, User, UserCreate } from './interface'

export class UserRepo implements IUserRepo {
  constructor() {}
  async exists(id: string) {
    const user = await MysqlUserModel.findOne({ where: { id } })
    return !!user
  }

  async getById(id: string) {
    const user = await MysqlUserModel.findOne({ where: { id } })
    if (user) {
      return this.convertMySqlToSharedType(user)
    } else {
      throw new Error('user not exists.') // FIXME ErrorHandlingしっかりしたい。
    }
  }

  async create(data: Omit<UserCreate, never>): Promise<void> {
    const isExists = await this.exists(data.id)
    if (!isExists) {
      await MysqlUserModel.create({ ...data })
    } else {
      throw new Error('user already exists.') // FIXME ErrorHandlingしっかりしたい。
    }
  }

  async update(data: Partial<User> & { id: string }): Promise<void> {
    const mysqlData = this.patiallyConvertSharedTypeToMysql(data)
    await MysqlUserModel.update(mysqlData, { where: { id: data.id } })
  }

  async delete(id: string): Promise<void> {
    await MysqlUserModel.destroy({ where: { id } })
  }

  private convertMySqlToSharedType(mysqlData: MysqlUserAttributes): User {
    return Object.assign(mysqlData, {
      createdAt: mysqlData.createdAt.getTime(),
      updatedAt: mysqlData.updatedAt.getTime(),
      deletedAt: mysqlData.deletedAt?.getTime(),
    })
  }

  private convertSharedTypeToMysql(sharedType: User): MysqlUserAttributes {
    return Object.assign(sharedType, {
      createdAt: new Date(sharedType.createdAt),
      updatedAt: new Date(sharedType.updatedAt),
      deletedAt: new Date(sharedType.deletedAt),
    })
  }

  private patiallyConvertSharedTypeToMysql(
    sharedType: Partial<User>,
  ): Partial<MysqlUserAttributes> {
    return Object.assign(sharedType, {
      createdAt: new Date(sharedType.createdAt),
      updatedAt: new Date(sharedType.updatedAt),
      deletedAt: new Date(sharedType.deletedAt),
    })
  }
}
