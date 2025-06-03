module Api
  module V1
    class IngrediantsController < ApplicationController
      def index
        ingrediants = Ingrediant.includes(:unit).all

        render json: IngrediantSerializer.new(ingrediants).serialize, status: :ok
      end
    end
  end
end
