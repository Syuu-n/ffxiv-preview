class Item < ApplicationRecord
  belongs_to :category

  # メインモデルが同じかつサブモデルが違うアイテム
  def variations
    items = Item.preload(:category).where(
      category: category,
      model_main_1: self.model_main_1,
      available: true,
    ).where.not(
      model_main_2: self.model_main_2,
    ).order(patch: :desc, item_level: :desc, id: :asc)
  end

  # 重複なしのメインモデルが同じかつサブモデルが違うアイテム
  def uniq_variations
    items = Item.preload(:category).where(
      category: category,
      model_main_1: self.model_main_1,
      available: true,
    ).where.not(
      model_main_2: self.model_main_2,
    ).order(patch: :desc, item_level: :desc, id: :asc)
    items.uniq {|item| [item.model_main_1, item.model_main_2]}
  end

  # メインモデルとサブモデルが同じのアイテム（自身を除く）
  def series
    items = Item.preload(:category).where(
      category: category,
      model_main_1: self.model_main_1,
      model_main_2: self.model_main_2,
      available: true,
    ).where.not(
      id: self.id
    ).order(patch: :desc, item_level: :desc, id: :asc)
  end

  # 入手方法の配列
  def source_array
    splitted_source = source.split(",")
    splitted_source.map{|ss| ss.include?("&&") ? ss.split("&&") : ss}
  end

  # 入手方法の配列（英語）
  def source_array_en
    splitted_source = source_en.split(",")
    splitted_source.map{|ss| ss.include?("&&") ? ss.split("&&") : ss}
  end

  # ロードストーン ID からメタデータを取得
  def fetch_meta_data_from_lodestone_id
    # 入手方法が設定されていない場合のみ取得する
    unless self.source
      sources = Scraping.get_item_meta_data(self)
      if sources
        formatted_source_ja = sources[0].size > 0 ? sources[0].join(",") : ""
        formatted_source_en = sources[1].size > 0 ? sources[1].join(",") : ""
        self.update!(source: formatted_source_ja, source_en: formatted_source_en)
      end
    end
  end

  # API からデータ取得
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

  # ロードストーン ID を取得
  def self.fetch_lodestone_ids(category_id)
    category = Category.find_by(id: category_id)
      if category
      # ロードストーン ID が設定されていないアイテムを取得
      items = Item.where(lodestone_id: nil, category_id: category.id, available: true)
      if items.size > 0
        # ロードストーンから名前と ID のハッシュを取得
        # {id: "c9ff175b4fe", name: "カーバンクル・トパーズイヤリング"}
        items_hash = Scraping.lodestone_items(category.api_id)

        items.each do |item|
          lodestone_item = items_hash.find{|l_item| l_item[:name] == item.name}
          if lodestone_item
            item.update!(lodestone_id: lodestone_item[:id])
          end
        end
      end
    end
  end
end
