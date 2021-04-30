class Item < ApplicationRecord
  belongs_to :category

  def models
    if model
      model.split(", ")
    else
      []
    end
  end

  def series
    if category
      klass = Object.const_get(category.name_en.singularize)
      klass.where(item_id: id)
    end
  end

  def variations
    items = Item.all
    items.select{|v_item| v_item.models[0] == self.models[0] && v_item.models[1] != self.models[1]}
  end

  def self.create_from_raw_data(category_klass, ids)
    if category_klass && ids
      klass = Object.const_get(category_klass.singularize)
      series = klass.where(id: ids)

      item_category = Category.find_by(name_en: category_klass)

      if series && item_category
        first_raw_data = series.first
        ActiveRecord::Base.transaction do
          item = Item.new(
            name: first_raw_data.name,
            name_en: first_raw_data.name_en,
            level: first_raw_data.level,
            item_level: first_raw_data.item_level,
            jobs: first_raw_data.jobs,
            jobs_en: first_raw_data.jobs_en,
            patch: first_raw_data.patch,
            is_untradable: first_raw_data.is_untradable,
            category: item_category,
            model: first_raw_data.model
          )
          item.save!

          series.each do |s|
            s.item_id = item.id
            s.save!
          end
        end
      end
    end
  end
end
