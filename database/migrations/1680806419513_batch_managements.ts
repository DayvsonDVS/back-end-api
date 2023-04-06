import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'batch_managements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('batch_id')
        .references('id')
        .inTable('batches')
        .onUpdate('cascade')
        .onDelete('cascade')

      table
        .integer('company_id')
        .references('id')
        .inTable('companies')
        .onUpdate('cascade')
        .onDelete('cascade')

      table.string('historic')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
