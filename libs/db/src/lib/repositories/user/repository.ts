import { MysqlUserModel } from '../../models'
import { UserAttributes } from '@jira-clone/shared-types'
import {
  IUserRepo,
  UserAttributesWithHashedPassword,
  UserCreationAttributes,
  UserUpdationAttributes,
} from '@jira-clone/db-interfaces'
import { UserDataMapper } from './dataMapper'

export class UserRepo implements IUserRepo {
  constructor() {}

  async getById(id: string): Promise<UserAttributes | void> {
    const user = await MysqlUserModel.findOne({ where: { id } })
    if (user) {
      return UserDataMapper.toUserAttributes(user)
    } else {
      return
    }
  }

  async getByEmail(email: string): Promise<UserAttributes | void> {
    const user = await MysqlUserModel.findOne({ where: { email } })
    if (user) {
      return UserDataMapper.toUserAttributes(user)
    } else {
      return
    }
  }

  async getWithHashedPasswordByEmail(
    email: string,
  ): Promise<UserAttributesWithHashedPassword | void> {
    const user = await MysqlUserModel.findOne({ where: { email } })
    if (user) {
      return UserDataMapper.toUserAttributesWithHashedPassword(user)
    } else {
      return
    }
  }

  async create(data: UserCreationAttributes): Promise<void> {
    await MysqlUserModel.create(
      UserDataMapper.toMysqlUserCreationAttributs(data),
    )
  }

  async update(
    data: Partial<UserUpdationAttributes> & { id: string },
  ): Promise<void> {
    await MysqlUserModel.update(
      UserDataMapper.toMysqlUserUpdatingAttributes(data),
      { where: { id: data.id } },
    )
  }

  async delete(id: string): Promise<void> {
    await MysqlUserModel.destroy({ where: { id } })
  }
}
