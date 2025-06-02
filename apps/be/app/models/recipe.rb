class Recipe < ApplicationRecord
  has_many :ingrediant_values, dependent: :destroy
  belongs_to :author
end
