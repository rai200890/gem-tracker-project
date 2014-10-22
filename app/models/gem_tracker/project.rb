class GemTracker::Project
  include ActiveModel::Model

  attr_accessor :url, :name, :repository, :branches

  def initialize params = {}
    @url = params[:url]
    @name = params[:name]
    @git_repository = GemTracker::GitRepository.new(url: @url, name: @name)
  end

  def self.find id
    repository = GemTracker::Repository.find(id)
    GemTracker::Project.new url: repository.url, name: repository.name
  end

  def self.create params = {}
    project = GemTracker::Project.new params
    project.save
    project
  end

  def save
    ActiveRecord::Base.transaction do
      repository = GemTracker::Repository.create(name: @name, name: @url)
      branch = GemTracker::Branch.where(repository_id: repository.id, name: @git_repository.current_branch).first_or_create
      errors.add(:base, repository.errors.full_messages) unless repository.valid?
      @git_repository.commits.each do |commit|
        GemTracker::Gemfile.create(commit_id: commit.objectish, branch_id: branch.id, date: commit.date,gems: @git_repository.gems(commit.objectish))
      end
      fail ActiveRecord::Rollback if errors.any?
    end
    errors.empty?
  end

end
