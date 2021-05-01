Rails.application.routes.draw do
  scope :api do
    namespace :v1, defaults: { format: :json } do
      resources :items, only: [:index, :show] do
        collection do
          get 'ids' => 'items#get_ids'
        end
      end
    end
  end
end
