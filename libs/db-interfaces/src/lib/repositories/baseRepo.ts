export interface Repo<Attributes, CreateAttributes, UpdationAttributes> {
  getById(id: string): Promise<Attributes | void>
  create(data: CreateAttributes): Promise<void>
  update(data: Partial<UpdationAttributes> & { id: string }): Promise<void>
  delete(id: string): Promise<void>
}
