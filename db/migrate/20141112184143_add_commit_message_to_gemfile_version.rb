class AddCommitMessageToGemfileVersion < ActiveRecord::Migration
  def change
    add_column :gemfile_versions, :commit_message, :string
  end
end
