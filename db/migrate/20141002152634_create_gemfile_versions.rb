class CreateGemfileVersions < ActiveRecord::Migration
  def change
    create_table :gemfile_versions do |t|
      t.integer :branch_id
      t.string :commit_identifier
    end
  end
end
