class IngrediantValue < ApplicationRecord
  belongs_to :ingrediant
  belongs_to :recipe
end
