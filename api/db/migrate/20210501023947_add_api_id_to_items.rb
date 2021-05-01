class AddApiIdToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :api_id, :string, after: :model
    add_column :items, :lodestone_id, :string, after: :model
  end
end
