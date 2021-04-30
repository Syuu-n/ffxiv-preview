class Earring < ApplicationRecord

  def models
    if model
      model.split(", ")
    else
      []
    end
  end

  def item
    if item_id
      Item.find_by(id: item_id)
    end
  end

  def self.fetch_from_api
    client = XIVAPI::Client.new(api_key: Rails.application.credentials.ffxivapi[:api_key], language: 'ja')
    earrings = client.search(filters: 'ItemUICategory.ID=41', limit: 5000)

    earring_ids = earrings.map(&:id)
    puts earring_ids

    earring_ids.each do |eid|
      db_earring = Earring.find_by(api_id: eid)
      if !db_earring
        puts "fetching ID: #{eid}"
        api_earring = client.content(name: 'Item', ids: [eid])
        db_earring = Earring.new(
          name: api_earring.name,
          name_en: api_earring.name_en,
          api_id: api_earring.id,
          level: api_earring.level_equip,
          item_level: api_earring.level_item,
          jobs: api_earring.class_job_category.name,
          jobs_en: api_earring.class_job_category.name_en,
          patch: api_earring.game_patch.version,
          is_untradable: api_earring.is_untradable,
          model: api_earring.model_main
        )
        db_earring.save!
      end
    end
  end
end
