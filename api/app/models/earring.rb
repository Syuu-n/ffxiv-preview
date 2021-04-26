class Earring < ApplicationRecord

  def item
    if item_id
      Item.find_by(id: item_id)
    end
  end
end
