class CreateEarrings < ActiveRecord::Migration[6.0]
  def change
    create_table :earrings do |t|

      t.timestamps
    end
  end
end
