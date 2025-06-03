FactoryBot.define do
  factory :recipe do
    title { "Pancakes" }
    cook_time { 10 }
    prep_time { 5 }
    image_url { "http://example.com/image.png" }
    author
    category
  end
end
