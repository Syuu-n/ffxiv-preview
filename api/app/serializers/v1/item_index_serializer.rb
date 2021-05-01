module V1
  class ItemIndexSerializer < ActiveModel::Serializer
    attributes :id, :name, :name_en, :level, :item_level, :jobs, :jobs_en, :patch,
    :category, :model_main_1, :model_main_2

    belongs_to :category
  end
end