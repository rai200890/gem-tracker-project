class GemTracker::GemfileVersion < ActiveRecord::Base

  belongs_to :branch
  has_and_belongs_to_many :gem_versions

  validate :commit_id, uniqueness: true, presence: true, scope: :branch_id
  validate :branch_id, presence: true

  scope :by_branch_id, ->(branch_id){where(branch_id: branch_id)}

end
