class GemTracker::Project
  include ActiveModel::Model

  attr_accessor :url, :name, :repository, :master_branch

  def initialize params = {}
    @url = params[:url]
    @name = params[:name]
    @git_repository = GemTracker::GitRepository.new(url: @url, name: @name)
    self.repository =  GemTracker::Repository.new(name: @name, name: @url)
    self.master_branch = GemTracker::Branch.create(repository_id: repository.id, name: @git_repository.current_branch)
  end

  def self.find id
    repository = GemTracker::Repository.find id
    GemTracker::Project.new repository: repository, name: repository.name, url: repository.url
  end

  def self.save params = {}
    ActiveRecord::Base.transaction do
      repository.save
      master_branch.save
      errors.add(:base, repository.errors.full_messages) unless repository.valid?
      errors.add(:base, master_branch.errors.full_messages) unless master_branch.valid?
      @git_repository.commits.each do |commit|
        GemTracker::Gemfile.create(commit_id: commit.objectish, branch_id: branch.id, date: commit.date,gems: @git_repository.gems(commit.objectish))
      end
      fail ActiveRecord::Rollback if errors.any?
    end
    errors.empty?
  end

end
