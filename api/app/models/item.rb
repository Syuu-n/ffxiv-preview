class Item < ApplicationRecord
  belongs_to :category

  def variations
    if category
      klass = Object.const_get(category.name_en.singularize)
      klass.where(item_id: id)
    end
  end
end
