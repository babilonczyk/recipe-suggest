FactoryBot.define do
  factory :ingrediant_value do
    value { 1.5 }
    recipe
    ingrediant
  end
end
