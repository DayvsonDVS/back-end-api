import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BatchManagement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public batch_id: number

  @column()
  public company_id: number

  @column()
  public status: string

  @column()
  public historic: string

  @column()
  public user: string

  @column()
  public receipt: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
