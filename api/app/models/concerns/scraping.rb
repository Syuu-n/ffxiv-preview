require 'nokogiri'
require 'open-uri'

module Scraping
  @icon_base_path = "./app/icons/"

  # ロードストーン ID を取得
  def self.lodestone_items(category_id)
    page = 1
    items = []

    while true do
      url = "https://jp.finalfantasyxiv.com/lodestone/playguide/db/item/?category2=4&page=#{page}&category3=#{category_id}"
      puts "Fetching page: #{page}"
      charset = nil
      html = URI.open(url) do |f|
        sleep(1)
        charset = f.charset
        f.read
      end

      doc = Nokogiri::HTML.parse(html, nil, charset)

      if !doc.at_css(".db-table__link_txt")
        break
      end

      item_lists = doc.css(".db-table__link_txt")
      item_lists.each do |node|
        href = node.at_css("a").attribute("href")
        id = href.to_s.match(/item\/(.+)\//)[1]
        name = node.at_css(".db-table__txt--detail_link").text
        items.push({id: id, name: name})
      end
      page += 1
    end
    items
  end

  # ロードストーン ID からメタデータをスクレイピングで取得
  def self.get_item_meta_data(item)
    if item.lodestone_id
      locals = ["jp", "na"]

      sources = locals.map do |local|
        item_url = "https://#{local}.finalfantasyxiv.com/lodestone/playguide/db/item/#{item.lodestone_id}"

        cratf_text = local == "jp" ? "製作" : "Crafting"
        trade_text = local == "jp" ? "トレード" : "Trade"

        charset = nil
        html = URI.open(item_url) do |f|
          sleep(2)
          charset = f.charset
          f.read
        end

        doc = Nokogiri::HTML.parse(html, nil, charset)

        # アイコンを取得
        if local == "jp"
          icon = doc.at_css(".db-view__item__icon").at_css(".sys_nq_element")
          if icon
            # アイコンを保存
            url = icon.attribute('src')
            File.open(@icon_base_path + item.lodestone_id + '.png','w+b') do |out|
              URI.open(url) do |data|
                out.write(data.read)
              end
            end
          end
        end

        item_base_container = doc.at_css(".db_cnts")

        # 入手方法を取得
        item_source = []
        # クラフトの入手
        craft = item_base_container.at_css(".db__l_main__base")
        if craft
          table_row = craft.css("tr")[1]
          job = table_row.at_css(".latest_patch__major__item").at_css(".db-table__txt--detail_link").text
          level = table_row.at_css(".db-table__body--dark").text.match(/[0-9]*/)[0]
          craft_source = "#{cratf_text}: #{job}(#{level})"
          item_source.push(craft_source)
          puts craft_source
        end

        # ID、ショップでの入手を取得
        item_base = item_base_container.at_css(".db__l_main__view").at_css(".db-table")
        if item_base
          table_rows = item_base.at_css("tbody").css("tr")
          table_rows.each do |tr|
            data = tr.at_css(".latest_patch__major__text")
            if data
              category_element = data.at_css(".db-table__txt--type")
              # カテゴリあり（ダンジョン、クエスト etc...）
              if category_element
                category = category_element.at_css("a").text
                content = data.at_css(".db-table__txt--detail_link").text
                category_source = "#{category}: #{content}"
                item_source.push(category_source)
                puts category_source
              else
                is_trade = data.at_css(".db-view__data__reward__item__name")
                if is_trade
                  # トレード
                  npc_name = tr.at_css(".db-shop__item__npc > a").text
                  npc_position = tr.at_css(".db-shop__item__xy > span").text
                  request_items = data.css(".db-view__data__reward__item__name__wrapper")
                  request_items_array = []
                  request_items.each do |r_item|
                    request_item_name = r_item.at_css("h4").text
                    request_count = r_item.at_css(".db-view__data__number").text
                    request_items_array.push("#{request_item_name} x #{request_count}")
                  end
                  request_items_string = request_items_array.join("&&")
                  trade_source = "#{trade_text}: #{npc_name}(#{npc_position})&&#{request_items_string}"
                  item_source.push(trade_source)
                  puts trade_source
                else
                  shop = data.at_css(".db-table__txt--detail_link")
                  if shop
                    # ショップ販売
                    position = tr.at_css(".db-table__body--dark").text
                    shop_source = "#{shop.text}：#{position}"
                    item_source.push(shop_source)
                    puts shop_source
                  end
                end
              end
            end
          end
        end
        item_source
      end
      sources
    end
  end
end