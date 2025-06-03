class IngrediantSerializer
  include Alba::Resource

  root_key :ingrediant, :ingrediants

  attributes :id, :name

  one :unit do
    attributes :id, :name, :help_text
  end
end
