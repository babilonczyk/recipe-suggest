require 'rails_helper'

RSpec.describe "Api::V1::Ingrediants", type: :request do
  let!(:unit) { create(:unit, name: "gram", help_text: "standard mass unit") }
  let!(:salt) { create(:ingrediant, name: "Salt", unit: unit) }
  let!(:sugar) { create(:ingrediant, name: "Sugar", unit: unit) }

  describe "GET /api/v1/ingrediants" do
    it "returns all ingrediants with their units" do
      get "/api/v1/ingrediants"

      expect(response).to have_http_status(:ok)
      data = JSON.parse(response.body)
      names = data["ingrediants"].map { |i| i["name"] }

      expect(names).to contain_exactly("Salt", "Sugar")
    end
  end
end
