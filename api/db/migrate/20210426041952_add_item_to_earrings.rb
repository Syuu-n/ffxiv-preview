class AddItemToEarrings < ActiveRecord::Migration[6.0]
  def change
    add_reference :earrings, :item, index: true
  end
end
