class GemTracker::GemVersion < ActiveRecord::Base

  belongs_to :gem
  has_and_belongs_to_many :gemfile_versions
  delegate :name, to: :gem, prefix: true
end