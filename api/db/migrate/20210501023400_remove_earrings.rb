class RemoveEarrings < ActiveRecord::Migration[6.0]
  def change
    drop_table :earrings
  end
end
