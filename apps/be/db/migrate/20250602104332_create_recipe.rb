class CreateRecipe < ActiveRecord::Migration[8.0]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.integer :cook_time, null: false
      t.integer :prep_time, null: false
      t.text :image_url, null: false

      t.integer :author_id, null: false
      t.integer :category_id, null: false
      t.timestamps
    end
  end
end
