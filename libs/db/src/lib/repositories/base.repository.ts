export interface Repo<Attributes, CreateAttributes> {
  exists(id: string): Promise<boolean>
  getById(id: string): Promise<Attributes>
  delete(id: string): Promise<void>
  create(data: CreateAttributes): Promise<void>
  update(data: Partial<Attributes> & { id: string }): Promise<void>
}
