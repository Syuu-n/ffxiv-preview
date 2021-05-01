class AddAvailableToItem < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :available, :boolean, default: :true, after: :is_untradable
  end
end
