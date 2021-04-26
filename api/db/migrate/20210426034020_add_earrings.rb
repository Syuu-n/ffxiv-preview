class AddEarrings < ActiveRecord::Migration[6.0]
  def change
    create_table :earrings do |t|
      t.string :name
      t.string :name_en
      t.integer :api_id
      t.string :lodestone_id
      t.integer :level
      t.integer :item_level
      t.string :patch
      t.boolean :is_untradable
    end
  end
end
