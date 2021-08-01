import { MysqlUserAttributes, MysqlUserModel } from '../../models'
import { UserAttributes } from '@jira-clone/shared-types'
import {
  IUserRepo,
  UserCreationAttributes,
  UserUpdationAttributes,
} from './interface'
import { UserDataMapper } from './dataMapper'

export class UserRepo implements IUserRepo {
  constructor() {}

  async getById(id: string): Promise<UserAttributes | void> {
    const user = await MysqlUserModel.findOne({ where: { id } })
    return UserDataMapper.toUserAttributes(user)
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
