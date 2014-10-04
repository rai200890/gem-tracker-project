class CreateGemVersion < ActiveRecord::Migration
  def change
    create_table :gem_versions do |t|
      t.string :name
      t.string :gem_id
      t.string :ineteger
    end
  end
end
