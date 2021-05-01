module V1
  class CategorySerializer < ActiveModel::Serializer
    attributes :name, :name_en
  end
end