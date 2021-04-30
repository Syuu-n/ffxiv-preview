class AddAvailableToEarring < ActiveRecord::Migration[6.0]
  def change
    add_column :earrings, :available, :boolean, after: :model, default: :true
  end
end
