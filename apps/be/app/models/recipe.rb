class Recipe < ApplicationRecord
  has_many :ingrediant_values, dependent: :destroy
  has_many :ingrediants, through: :ingrediant_values
  belongs_to :author
  belongs_to :category
end
