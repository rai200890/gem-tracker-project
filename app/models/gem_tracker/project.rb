class GemTracker::Project
  include GemTracker
  include ActiveModel::Validations
  include ActiveModel::Conversion
  include ActiveModel::Translation
  extend ActiveModel::Naming

  attr_accessor :git_repository, :path, :name, :url

  def initialize(params = {})
    self.name = params[:name]
    self.url = params[:url]
    self.git_repository = GemTracker::GitRepository.new(url: url, name: name)
  end

  def save
    ActiveRecord::Base.transaction do
      repository = GemTracker::Repository.where(name: name, url: url).first_or_create
      branch = GemTracker::Branch.where(repository_id: repository.id, name: git_repository.git.current_branch).first_or_create
      errors.add(:base, repository.errors.full_messages) unless repository.valid?
      errors.add(:base, branch.errors.full_messages) unless branch.valid?
      git_repository.commit_ids.each do |commit|
        GemTracker::Gemfile.create(commit_id: commit, branch_id: branch.id, gems: git_repository.gems(commit))
      end
      fail ActiveRecord::Rollback if errors.any?
    end
    errors.empty?
  end

end
