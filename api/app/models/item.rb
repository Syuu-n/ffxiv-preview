class Item < ApplicationRecord
  has_many :earrings
  belongs_to :category
end
