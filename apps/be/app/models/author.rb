class Author < ApplicationRecord
  has_many :recipes, dependent: :destroy
end
