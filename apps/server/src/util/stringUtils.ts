import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

interface IStrUtil {
  uuid(): string
}

class StrUtilsImpl implements IStrUtil {
  uuid(): string {
    return uuidv4()
  }
}

export const StrUtils = new StrUtilsImpl()
