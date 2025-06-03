class CreateIngrediants < ActiveRecord::Migration[8.0]
  def change
    create_table :ingrediants do |t|
      t.string :name, null: false
      t.integer :unit_id, null: false

      t.timestamps
    end

    add_index :ingrediants, :unit_id
  end
end
