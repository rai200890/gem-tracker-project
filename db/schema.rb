# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141002152806) do

  create_table "branches", force: true do |t|
    t.integer "repository_id"
    t.string  "name"
  end

  add_index "branches", ["repository_id"], name: "index_branches_on_repository_id", using: :btree

  create_table "gem_versions", force: true do |t|
    t.string  "version"
    t.integer "gem_id"
  end

  add_index "gem_versions", ["gem_id"], name: "index_gem_versions_on_gem_id", using: :btree
  add_index "gem_versions", ["version"], name: "index_gem_versions_on_version", using: :btree

  create_table "gemfile_versions", force: true do |t|
    t.integer "branch_id"
    t.string  "commit_id"
  end

  add_index "gemfile_versions", ["branch_id"], name: "index_gemfile_versions_on_branch_id", using: :btree
  add_index "gemfile_versions", ["commit_id"], name: "index_gemfile_versions_on_commit_id", using: :btree

  create_table "gems", force: true do |t|
    t.string "name"
    t.string "source"
  end

  add_index "gems", ["name"], name: "index_gems_on_name", using: :btree

  create_table "repositories", force: true do |t|
    t.string "url"
    t.string "name"
  end

end
