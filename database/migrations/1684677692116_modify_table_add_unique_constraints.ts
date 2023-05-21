import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('cnpj').unique().alter()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.string('cnpj').alter()
    })
  }
}
