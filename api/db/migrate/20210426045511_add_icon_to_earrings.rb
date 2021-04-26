class AddIconToEarrings < ActiveRecord::Migration[6.0]
  def change
    add_column :earrings, :icon, :text
  end
end
