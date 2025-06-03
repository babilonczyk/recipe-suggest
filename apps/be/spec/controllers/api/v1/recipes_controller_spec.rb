require 'rails_helper'

RSpec.describe Api::V1::RecipesController, type: :request do
  let!(:author) { create(:author) }
  let!(:category) { create(:category) }

  let!(:ingrediant_1) { create(:ingrediant, name: "Salt") }
  let!(:ingrediant_2) { create(:ingrediant, name: "Sugar") }
  let!(:ingrediant_3) { create(:ingrediant, name: "Flour") }

  let!(:recipe_a) { create(:recipe, title: "Recipe A", author: author, category: category) }
  let!(:ingrediant_value_1) { create(:ingrediant_value, recipe: recipe_a, ingrediant: ingrediant_1) }
  let!(:ingrediant_value_2) { create(:ingrediant_value, recipe: recipe_a, ingrediant: ingrediant_2) }


  let!(:recipe_b) { create(:recipe, title: "Recipe B", author: author, category: category) }
  let!(:ingrediant_value_3) { create(:ingrediant_value, recipe: recipe_b, ingrediant: ingrediant_2) }
  let!(:ingrediant_value_4) { create(:ingrediant_value, recipe: recipe_b, ingrediant: ingrediant_3) }

  describe "GET /api/v1/recipes" do
    it "returns all recipes" do
      get "/api/v1/recipes"

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)

      expect(body["recipes"].size).to eq(2)
    end

    it "returns recipes sorted by matched ingredients" do
      get "/api/v1/recipes?ingrediant_ids=#{ingrediant_1.id},#{ingrediant_2.id}"


      body = JSON.parse(response.body)
      titles = body["recipes"].map { |r| r["title"] }

      expect(titles).to eq([ "Recipe A", "Recipe B" ])
    end
  end

  describe "GET /api/v1/recipes/:id" do
    it "returns a recipe by ID" do
      get "/api/v1/recipes/#{recipe_a.id}"

      expect(response).to have_http_status(:ok)

      body = JSON.parse(response.body)

      expect(body["recipe"]["id"]).to eq(recipe_a.id)
    end

    it "returns 404 if recipe not found" do
      get "/api/v1/recipes/999999"

      expect(response).to have_http_status(:not_found)
    end
  end
end
