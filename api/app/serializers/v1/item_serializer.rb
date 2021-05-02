module V1
  class ItemSerializer < ActiveModel::Serializer
    attribute :lodestone_id, key: :id
    attributes :name, :name_en, :level, :item_level, :jobs, :jobs_en, :patch,
    :is_untradable, :category,
    :model_main_1, :model_main_2, :model_main_3, :model_main_4,
    :source, :source_en, :variations, :uniq_variations, :series

    belongs_to :category
    has_many :variations, serializer: ItemIndexSerializer
    has_many :uniq_variations, serializer: ItemIndexSerializer
    has_many :series, serializer: ItemIndexSerializer
  end
end