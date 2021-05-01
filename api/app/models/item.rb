class Item < ApplicationRecord
  belongs_to :category

  # メインモデルが同じかつサブモデルが違うアイテム
  def variations
    items = Item.where(
      category: category,
      model_main_1: self.model_main_1,
      available: true,
    ).where.not(
      model_main_2: self.model_main_2,
    )
  end

  def self.fetch_from_api(category_id)
    # カテゴリ取得
    selected_category = Category.find_by(id: category_id)
    if selected_category
      # アイテム ID リスト取得
      puts "Category: #{selected_category.name}"
      client = XIVAPI::Client.new(api_key: Rails.application.credentials.ffxivapi[:api_key], language: 'ja')
      items = client.search(filters: "ItemUICategory.ID=#{selected_category.api_id}", limit: 5000)

      item_ids = items.map(&:id)
      fetch_count = 0

      # DB に 同じ api_id が存在しなければ API から取得
      item_ids.each do |iid|
        db_item = Item.find_by(api_id: iid)
        if !db_item
          puts "Fetching item from api ID: #{iid}"
          api_item = client.content(name: 'Item', ids: [iid])

          item_model_mains = api_item.model_main.split(", ")

          db_item = Item.new(
            name: api_item.name,
            name_en: api_item.name_en,
            level: api_item.level_equip,
            item_level: api_item.level_item,
            jobs: api_item.class_job_category.name,
            jobs_en: api_item.class_job_category.name_en,
            patch: api_item.game_patch.version,
            is_untradable: api_item.is_untradable,
            category: selected_category,
            api_id: api_item.id,
            model_main_1: item_model_mains[0],
            model_main_2: item_model_mains[1],
            model_main_3: item_model_mains[2],
            model_main_4: item_model_mains[3],
          )
          db_item.save!
          fetch_count += 1
        end
      end
      puts "Fetched item count: #{fetch_count}"
    end
  end
end
