class CreateGemVersionsGemfileVersions < ActiveRecord::Migration
  def change
    create_table :gem_versions_gemfile_versions do |t|
      t.integer :gem_version_id
      t.integer :gemfile_version_id
      t.index :gem_version_id
      t.index :gemfile_version_id
    end
  end
end
