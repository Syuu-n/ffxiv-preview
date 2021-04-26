# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_26_073144) do

  create_table "categories", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "name_en"
  end

  create_table "earrings", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "name_en"
    t.integer "api_id"
    t.string "lodestone_id"
    t.integer "level"
    t.integer "item_level"
    t.string "jobs"
    t.string "jobs_en"
    t.string "patch"
    t.boolean "is_untradable"
    t.integer "item_id"
    t.text "icon"
  end

  create_table "items", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "name_en"
    t.integer "level"
    t.integer "item_level"
    t.string "jobs"
    t.string "jobs_en"
    t.string "patch"
    t.boolean "is_untradable"
    t.bigint "category_id"
    t.text "source"
    t.text "source_en"
    t.text "img_1"
    t.text "img_2"
    t.text "img_3"
    t.text "icon"
    t.string "relation_ids"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_items_on_category_id"
  end

  add_foreign_key "items", "categories"
end
