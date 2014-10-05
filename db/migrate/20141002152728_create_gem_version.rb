class CreateGemVersion < ActiveRecord::Migration
  def change
    create_table :gem_versions do |t|
      t.string :name
      t.string :integer
      t.integer :gem_id
    end
  end
end
