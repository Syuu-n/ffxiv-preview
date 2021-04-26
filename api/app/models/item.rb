class Item < ApplicationRecord
  belongs_to :category

  def variations
    if category
      klass = Object.const_get(category.name_en.singularize)
      klass.where(item_id: id)
    end
  end

  def self.create_from_variations(category_klass, ids)
    if category_klass && ids
      klass = Object.const_get(category_klass.singularize)
      variations = klass.where(id: ids)

      if variations
        variation = variations.first
        ActiveRecord::Base.transaction do
          item = Item.new(
            name: variation.name,
            name_en: variation.name_en,
            level: variation.level,
            item_level: variation.item_level,
            jobs: variation.jobs,
            jobs_en: variation.jobs_en,
            patch: variation.patch,
            is_untradable: variation.is_untradable,
            category: Category.find_by(name_en: category_klass)
          )
          item.save!

          variations.each do |v|
            v.item_id = item.id
            v.save!
          end
        end
      end
    end
  end
end
