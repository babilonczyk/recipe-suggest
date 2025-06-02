class CreateUnits < ActiveRecord::Migration[8.0]
  def change
    create_table :units do |t|
      t.string :name, null: false
      t.string :help_text, null: false

      t.timestamps
    end
  end
end
