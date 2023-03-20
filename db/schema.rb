# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_03_20_211125) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.integer "hp"
    t.integer "attack"
    t.integer "defense"
    t.integer "speed"
    t.integer "money", default: 500
    t.integer "luck"
    t.integer "experience", default: 0
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "avatar_url", default: "https://i.imgur.com/Y5Efdki.png"
    t.float "current_hp"
    t.index ["user_id"], name: "index_characters_on_user_id"
  end

  create_table "dives", force: :cascade do |t|
    t.bigint "character_id", null: false
    t.integer "level_reached", default: 1
    t.integer "experience_reward", default: 0
    t.integer "enemies_slain", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "current", default: true
    t.integer "pet_id_1"
    t.integer "pet_id_2"
    t.integer "money_reward", default: 0
    t.index ["character_id"], name: "index_dives_on_character_id"
  end

  create_table "enemies", force: :cascade do |t|
    t.bigint "dive_id", null: false
    t.bigint "enemy_archetype_id", null: false
    t.float "hp"
    t.float "attack"
    t.float "defense"
    t.float "speed"
    t.integer "level", default: 1
    t.boolean "boss", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["dive_id"], name: "index_enemies_on_dive_id"
    t.index ["enemy_archetype_id"], name: "index_enemies_on_enemy_archetype_id"
  end

  create_table "enemy_archetypes", force: :cascade do |t|
    t.string "name"
    t.string "image_url"
    t.float "hp_modifier"
    t.float "attack_modifier"
    t.float "defense_modifier"
    t.float "speed_modifier"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "description"
  end

  create_table "pet_archetypes", force: :cascade do |t|
    t.string "name"
    t.string "image_url"
    t.float "attack"
    t.float "speed"
    t.float "defense"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "description"
  end

  create_table "pets", force: :cascade do |t|
    t.bigint "character_id", null: false
    t.bigint "pet_archetype_id", null: false
    t.string "name"
    t.integer "loyalty", default: 5
    t.integer "energy", default: 5
    t.string "modifier"
    t.integer "level", default: 1
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["character_id"], name: "index_pets_on_character_id"
    t.index ["pet_archetype_id"], name: "index_pets_on_pet_archetype_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.boolean "admin", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email"
  end

  add_foreign_key "characters", "users"
  add_foreign_key "dives", "characters"
  add_foreign_key "enemies", "dives"
  add_foreign_key "enemies", "enemy_archetypes"
  add_foreign_key "pets", "characters"
  add_foreign_key "pets", "pet_archetypes"
end
