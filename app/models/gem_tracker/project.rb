class GemTracker::Project
  include ActiveModel::Model

  attr_accessor :url, :name, :repository, :master_branch

  def initialize params = {}
    @url = params[:url]
    @name = params[:name]
    @git_repository = GemTracker::GitRepository.new(url: @url, name: @name)
    self.repository =  params[:repository] || GemTracker::Repository.new(url: @url, name: @name)
    self.master_branch = params[:master_branch] || GemTracker::Branch.new(name: @git_repository.current_branch) unless @git_repository.errors.any?
  end

  def self.find id
    repository = GemTracker::Repository.find id
    master_branch = GemTracker::Branch.where(repository_id: repository.id, name: 'master').first
    GemTracker::Project.new repository: repository, name: repository.name, url: repository.url, master_branch: master_branch
  end

  def self.create params = {}
    project = GemTracker::Project.new params
    project.save
    project
  end

  def save
    ActiveRecord::Base.transaction do
      repository.save
      master_branch.repository = repository
      master_branch.save
      @git_repository.commits.each do |commit|
        GemTracker::Gemfile.create(commit_id: commit.objectish, branch_id: master_branch.id, date: commit.date,gems: @git_repository.gems(commit.objectish))
      end
      errors.add(:base, repository.errors.full_messages) unless repository.valid?
      errors.add(:base, master_branch.errors.full_messages) unless master_branch.valid?
      errors.add(:base, @git_repository.errors.full_messages) if @git_repository.errors.any?
      fail ActiveRecord::Rollback if errors.any?
    end
    errors.empty?
  end

  def branches
    @git_repository.branches
  end

end
