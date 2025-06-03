module Api
  module V1
    class RecipesController < ApplicationController
      def index
        recipes = Recipe
          .includes(:author, :category, ingrediant_values: { ingrediant: :unit }).all

        if params[:ingrediant_ids].present?
          ingrediant_ids = params[:ingrediant_ids]&.split(",")&.map(&:to_i)

          recipes = Recipe
            .joins(:ingrediant_values)
            .where(ingrediant_values: { ingrediant_id: ingrediant_ids })
            .select("recipes.*")
            .group("recipes.id")
            .order("COUNT(ingrediant_values.id) DESC")
            .includes(:author, :category, ingrediant_values: { ingrediant: :unit })
        end

        render json: RecipeSerializer.new(recipes).serialize, status: :ok
      end

      def show
        recipe = Recipe
          .includes(:author, :category, ingrediant_values: { ingrediant: :unit })
          .find_by(id: params[:id])

        return render json: { error: "Recipe not found" }, status: :not_found unless recipe

        render json: RecipeSerializer.new(recipe).serialize, status: :ok
      end
    end
  end
end
