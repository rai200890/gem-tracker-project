class AddColumnDateToGemfileVersions < ActiveRecord::Migration
  def change
    add_column :gemfile_versions, :date, :datetime
  end
end
