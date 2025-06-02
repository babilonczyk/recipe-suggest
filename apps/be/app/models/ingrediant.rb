class Ingrediant < ApplicationRecord
  belongs_to :unit
  has_many :ingrediant_values
end
