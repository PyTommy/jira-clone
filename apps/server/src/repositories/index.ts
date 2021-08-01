import { UserRepo as MysqlUserRepo } from '@jira-clone/db'
import { IUserRepo } from '@jira-clone/db-interfaces'

class UserRepoImpl extends MysqlUserRepo implements IUserRepo {}

export const UserRepo = new UserRepoImpl()
