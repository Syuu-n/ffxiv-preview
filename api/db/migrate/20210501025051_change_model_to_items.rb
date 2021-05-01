class ChangeModelToItems < ActiveRecord::Migration[6.0]
  def change
    remove_column :items, :model, :string
    
    add_column :items, :model_main_4, :integer, after: :api_id
    add_column :items, :model_main_3, :integer, after: :api_id
    add_column :items, :model_main_2, :integer, after: :api_id
    add_column :items, :model_main_1, :integer, after: :api_id
  end
end
