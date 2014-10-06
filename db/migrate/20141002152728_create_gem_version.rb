class CreateGemVersion < ActiveRecord::Migration
  def change
    create_table :gem_versions do |t|
      t.string :version
      t.integer :gem_id
      t.index :version
      t.index :gem_id
    end
  end
end
