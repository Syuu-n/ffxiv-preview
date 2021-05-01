  module V1
  class ItemSerializer < ActiveModel::Serializer
    attributes :id, :name, :name_en, :level, :item_level, :jobs, :jobs_en, :patch,
    :is_untradable, :category, :lodestone_id,
    :model_main_1, :model_main_2, :model_main_3, :model_main_4,
    :source, :source_en

    belongs_to :category
  end
end