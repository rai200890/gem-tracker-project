class GemTracker::Project
  include ActiveModel::Model

  attr_accessor :url, :name, :repository, :branches

  def initialize params = {}
    @url = params[:url]
    @name = params[:name]
    @git_repository = GemTracker::GitRepository.new(url: @url, name: @name)
    self.repository = GemTracker::Repository.where(url: @url, name: @name).first_or_initialize
    self.branches = @git_repository.branches.map{|branch| GemTracker::Branch.where(name: branch).first_or_initialize}
  end

  def self.find id
    repository = GemTracker::Repository.find id
    GemTracker::Project.new name: repository.name, url: repository.url
  end

  def self.create params = {}
    project = GemTracker::Project.new params
    project.save
    project
  end

  def save
    ActiveRecord::Base.transaction do
      repository.save
      errors.add(:base, repository.errors.full_messages) unless repository.valid?
      branches.each do |branch|
        branch.repository = repository
        branch.save
        errors.add(:base, branch.errors.full_messages) unless branch.valid?
        @git_repository.commits.each do |commit|
          GemTracker::Gemfile.create(commit_id: commit.objectish, branch_id: branch.id, date: commit.date, gems: @git_repository.gems(branch.name, commit.objectish))
        end
      end
      errors.add(:base, @git_repository.errors.full_messages) if @git_repository.errors.any?
      fail ActiveRecord::Rollback if errors.any?
    end
    errors.empty?
  end

end
