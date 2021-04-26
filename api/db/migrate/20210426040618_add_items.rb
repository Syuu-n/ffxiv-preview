class AddItems < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :name_en
    end

    create_table :items do |t|
      t.string :name
      t.string :name_en
      t.integer :level
      t.integer :item_level
      t.string :patch
      t.boolean :is_untradable
      t.references :category, foreign_key: true
      t.text :source
      t.text :source_en
      t.text :img_1
      t.text :img_2
      t.text :img_3
      t.text :icon
      t.string :relation_ids

      t.timestamps
    end
  end
end
