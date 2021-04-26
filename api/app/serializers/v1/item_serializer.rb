  
module V1
  class ItemSerializer < ActiveModel::Serializer
    attributes :id, :name, :name_en, :level, :item_level, :jobs, :jobs_en, :patch, :is_untradable, :category, :source, :source_en

    belongs_to :category
  end
end