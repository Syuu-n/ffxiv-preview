require 'nokogiri'
require 'open-uri'

module Scraping
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
end