module V1
  class ItemsController < ApplicationController

    before_action :setup_item, only: [:show]

    # GET /api/v1/items
    def index
      items = Item.preload(:category).where(available: true)
      .order(patch: :desc, item_level: :desc, id: :asc).page(index_params[:page] ||= 1)
      # u_items = items.uniq {|item| [item.model_main_1, item.model_main_2]}

      render json: items, status: :ok, adapter: :json, meta: pagination_dict(items),
      each_serializer: ItemIndexSerializer
    end

    # GET /api/v1/items/ids
    def get_ids
      item_ids = Item.all.where(available: true).map do|item|
        {
          params: { id: item.lodestone_id.to_s }
        }
      end

      render json: item_ids, status: :ok
    end

    # GET /api/v1/items/:id
    def show
      render json: @item, status: :ok
    end

    private

    def setup_item
      @item = Item.find_by(lodestone_id: params[:id])

      unless @item
        render json: { code: 'item_not_found' }, status: :not_found and return
      end

      unless @item.available
        render json: { code: 'item_not_found' }, status: :not_found and return
      end
    end

    def index_params
      params.permit(:page)
    end
  end
end