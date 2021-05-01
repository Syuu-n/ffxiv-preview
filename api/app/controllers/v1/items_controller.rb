module V1
  class ItemsController < ApplicationController

    before_action :setup_item, only: [:show]

    # GET /api/v1/items
    def index
      items = Item.preload(:category).order(patch: :desc, item_level: :desc).where(available: true)

      render json: items, status: :ok
    end

    # GET /api/v1/items/:id
    def show
      render json: @item, status: :ok
    end

    private

    def setup_item
      @item = Item.find_by(id: params[:id])
      unless @item
        render json: { code: 'item_not_found' }, status: :not_found and return
      end
    end
  end
end