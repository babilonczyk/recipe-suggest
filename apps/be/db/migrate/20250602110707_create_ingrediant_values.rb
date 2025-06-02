class CreateIngrediantValues < ActiveRecord::Migration[8.0]
  def change
    create_table :ingrediant_values do |t|
      t.float :value, null: false

      t.integer :ingrediant_id, null: false
      t.integer :recipe_id, null: false
      t.timestamps
    end
  end
end
