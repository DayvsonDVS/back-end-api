import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('alert')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
