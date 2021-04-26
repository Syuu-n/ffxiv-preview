Rails.application.routes.draw do
  scope :api do
    namespace :v1, defaults: { format: :json } do
      resources :items, only: [:index, :show] do
      end
    end
  end
end
