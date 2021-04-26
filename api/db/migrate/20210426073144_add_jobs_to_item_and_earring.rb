class AddJobsToItemAndEarring < ActiveRecord::Migration[6.0]
  def change
    add_column :earrings, :jobs, :string, after: :item_level
    add_column :earrings, :jobs_en, :string, after: :jobs

    add_column :items, :jobs, :string, after: :item_level
    add_column :items, :jobs_en, :string, after: :jobs
  end
end
