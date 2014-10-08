class GemTracker::Project
  include ActiveModel::Model

  attr_accessor :git_repository, :path, :name, :url, :repository

  def initialize params = {}
    super
    self.git_repository = GemTracker::GitRepository.new(url: url, name: name)
  end

  def self.create params = {}
    project = GemTracker::Project.new params
    project.save
    project
  end

  def save
    ActiveRecord::Base.transaction do
      self.repository = GemTracker::Repository.where(name: name, url: url).first_or_create
      branch = GemTracker::Branch.where(repository_id: repository.id, name: git_repository.git.current_branch).first_or_create
      errors.add(:base, repository.errors.full_messages) unless repository.valid?
      errors.add(:base, branch.errors.full_messages) unless branch.valid?
      git_repository.commits.each do |commit|
        GemTracker::Gemfile.create(commit_id: commit.objectish, branch_id: branch.id, date: commit.date,gems: git_repository.gems(commit.objectish))
      end
      fail ActiveRecord::Rollback if errors.any?
    end
    errors.empty?
  end

end
