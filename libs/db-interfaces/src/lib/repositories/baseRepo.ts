// 【参照】
// Title: Implementing DTOs, Mappers & the Repository Pattern using the Sequelize ORM [with Examples] - DDD w/ TypeScript
// URL: https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/#Data-Mappers
export interface Repo<Attributes, CreateAttributes, UpdationAttributes> {
  getById(id: string): Promise<Attributes | void>
  create(data: CreateAttributes): Promise<void>
  update(data: Partial<UpdationAttributes> & { id: string }): Promise<void>
  delete(id: string): Promise<void>
}
