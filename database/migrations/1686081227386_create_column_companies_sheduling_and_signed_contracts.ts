import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('scheduling')
      table.string('signed_contract')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('scheduling')
      table.dropColumn('signed_contract')
    })
  }
}
