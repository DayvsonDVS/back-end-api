import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'batch_managements'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('follow')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
