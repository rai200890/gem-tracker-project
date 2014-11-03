class GemTracker::Branch < ActiveRecord::Base

  belongs_to :repository
  has_many :gemfile_versions

  scope :by_repository_id, ->(repository_id){where(repository_id: repository_id)}

end
