class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :sku
      t.string :name
      t.text :description
      t.integer :stock
      t.float :price

      t.timestamps
    end
  end
end
