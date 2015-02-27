class AddCommitAuthorToGemfileVersions < ActiveRecord::Migration
  def change
    add_column :gemfile_versions, :commit_author, :string
  end
end
