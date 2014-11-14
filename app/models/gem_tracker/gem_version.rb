class GemTracker::GemVersion < ActiveRecord::Base

  belongs_to :gem
  has_and_belongs_to_many :gemfile_versions
  delegate :name, to: :gem, prefix: true

  validate :version, uniqueness: true, presence: true, scope: :gem_id

  scope :by_gemfile_version_id, ->(id){joins(:gemfile_versions).where(gemfile_versions: {id:id})}

end