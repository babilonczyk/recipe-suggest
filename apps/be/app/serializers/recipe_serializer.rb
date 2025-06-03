class RecipeSerializer
  include Alba::Resource

  root_key :recipe, :recipes

  attributes :id, :title, :cook_time, :prep_time, :image_url

  one :author do
    attributes :id, :name
  end

  one :category do
    attributes :id, :name
  end

  many :ingrediant_values do
    many :ingrediant do
      attributes :id, :name
      one :unit do
        attributes :id, :name, :help_text
      end
    end

    attributes :id, :value
  end
end
