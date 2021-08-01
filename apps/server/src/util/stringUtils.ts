import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

interface IStrUtil {
  hash(str: string): Promise<string>
  uuid(): string
}

class StrUtilsImpl implements IStrUtil {
  async hash(str: string): Promise<string> {
    return bcrypt.hash(str, 8)
  }
  uuid(): string {
    return uuidv4()
  }
}

export const StrUtils = new StrUtilsImpl()
