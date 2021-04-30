class AddModelToItem < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :model, :string, after: :category_id
    add_column :earrings, :model, :string, after: :is_untradable

    remove_column :items, :relation_ids, :string
  end
end
