export interface Repo<Attributes, CreateAttributes> {
  getById(id: string): Promise<Attributes | void>
  delete(id: string): Promise<void>
  create(data: CreateAttributes): Promise<void>
  update(data: Partial<Attributes> & { id: string }): Promise<void>
}
