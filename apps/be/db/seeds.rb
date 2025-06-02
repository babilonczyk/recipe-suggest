require 'json'

FRACTION_MAP = {
  "½" => 0.5, "⅓" => 0.33, "¼" => 0.25, "¾" => 0.75,
  "⅔" => 0.66, "⅛" => 0.125
}

COMMON_UNITS = %w[
  cup cups tsp tbsp tablespoon tablespoons teaspoon teaspoons
  g gram grams kg ml liter liters ounce ounces lb lbs
  slice slices piece pieces package packages can cans bottle bottles
]

UNIT_NOTES = {
  "cup" => "1 cup ≈ 240 ml",
  "cups" => "1 cup ≈ 240 ml",
  "tsp" => "1 tsp ≈ 5 ml",
  "teaspoon" => "1 tsp ≈ 5 ml",
  "teaspoons" => "1 tsp ≈ 5 ml",
  "tbsp" => "1 tbsp ≈ 15 ml",
  "tablespoon" => "1 tbsp ≈ 15 ml",
  "tablespoons" => "1 tbsp ≈ 15 ml",
  "g" => "grams",
  "gram" => "grams",
  "grams" => "grams",
  "kg" => "kilograms",
  "ml" => "milliliters",
  "l" => "liters",
  "liter" => "liters",
  "liters" => "liters",
  "oz" => "1 oz ≈ 28.35 g",
  "ounce" => "1 oz ≈ 28.35 g",
  "ounces" => "1 oz ≈ 28.35 g",
  "lb" => "1 lb ≈ 453.6 g",
  "lbs" => "1 lb ≈ 453.6 g",
  "slice" => "slices",
  "slices" => "slices",
  "piece" => "pieces",
  "pieces" => "pieces",
  "package" => "package",
  "packages" => "package",
  "can" => "can",
  "cans" => "can",
  "bottle" => "bottle",
  "bottles" => "bottle",
  "pinch" => "pinch",
  "dash" => "dash",
  "clove" => "clove",
  "cloves" => "clove",
  "stick" => "stick",
  "sticks" => "stick",
  "container" => "container",
  "containers" => "container",
  "jar" => "jar",
  "jars" => "jar",
  "envelope" => "envelope",
  "envelopes" => "envelope",
  "drop" => "drop",
  "drops" => "drop"
}

UNIT_SINGULAR_MAP = {
  "cups" => "cup",
  "teaspoons" => "teaspoon",
  "tablespoons" => "tablespoon",
  "grams" => "gram",
  "ounces" => "ounce",
  "lbs" => "lb",
  "liters" => "liter",
  "slices" => "slice",
  "pieces" => "piece",
  "packages" => "package",
  "cans" => "can",
  "bottles" => "bottle",
  "cloves" => "clove",
  "sticks" => "stick",
  "containers" => "container",
  "jars" => "jar",
  "envelopes" => "envelope",
  "drops" => "drop"
}

def parse_ingredient(ingredient_string)
  parts = ingredient_string.split(" ")

  amount = 0.0
  i = 0
  while i < parts.size && (numeric?(parts[i]) || FRACTION_MAP.key?(parts[i]))
    amount += FRACTION_MAP[parts[i]] || parts[i].to_f
    i += 1
  end

  unit = nil
  if i < parts.size && COMMON_UNITS.include?(parts[i].downcase)
    unit = parts[i].downcase
    i += 1
  end

  # Default unit if none recognized
  unit ||= "piece"

  # Normalize unit to singular form
  singular_unit = UNIT_SINGULAR_MAP[unit] || unit

  raw_name = parts[i..].join(" ")
  name = raw_name.gsub(/\s*\([^)]*\)/, "").strip

  note = UNIT_NOTES[singular_unit]

  {
    name: name,
    unit: singular_unit,
    amount: amount,
    note: note
  }
end

def numeric?(str)
  Float(str)
  true
rescue StandardError
  false
end

# --------------------------------------------------------------------

file_path = Rails.root.join('db', 'recipes-en.json')
file_content = File.read(file_path)
recipes = JSON.parse(file_content)

puts "Seeding #{recipes.length} recipes..."

recipes.in_groups_of(100, false) do |batch|
  batch.each do |recipe_data|
    print "."

    # CREATE AUTHOR
    author = Author.find_or_create_by!(name: recipe_data['author'])

    ingrediants = recipe_data['ingredients'].map do |ingredient_data|
      ingrediant = parse_ingredient(ingredient_data)

      # CREATE UNIT
      unit = Unit.find_or_create_by!(name: ingrediant[:unit], help_text: ingrediant[:note]) if ingrediant[:unit]

      # CREATE INGREDIANT
      ingrediant_record = Ingrediant.find_or_create_by!(name: ingrediant[:name], unit_id: unit.id)

      { record: ingrediant_record, amount: ingrediant[:amount] }
    end

    # CREATE CATEGORY
    category = Category.find_or_create_by!(name: recipe_data['category'])

    # CREATE RECIPE
    recipe = Recipe.find_or_create_by!(
      title: recipe_data['title'],
      cook_time: recipe_data['cook_time'],
      prep_time: recipe_data['prep_time'],
      image_url: recipe_data['image'],
      author_id: author.id,
      category_id: category.id
    )

    # CREATE INGREDIANT VALUES
    ingrediants.each do |ingrediant|
      IngrediantValue.create!(
        value: ingrediant[:amount],
        ingrediant_id: ingrediant[:record].id,
        recipe_id: recipe.id
      )
    end
  end
end

puts "\nCreated #{Author.count} authors."
puts "Created #{Category.count} categories."
puts "Created #{Recipe.count} recipes."
puts "Created #{Ingrediant.count} ingrediants."
puts "Created #{IngrediantValue.count} ingrediant values."
puts "Created #{Unit.count} units."

puts "Seeding completed successfully."
