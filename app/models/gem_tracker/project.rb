class GemTracker::Project
  include GemTracker
  include ActiveModel::Validations
  include ActiveModel::Conversion
  include ActiveModel::Translation
  extend ActiveModel::Naming

  attr_accessor :git_repository, :path, :name, :url

  TMP_PATH = Rails.root.join("tmp","git")

  def initialize(params = {})
    self.name = params[:name]
    self.url = params[:url]
    self.path = "#{TMP_PATH}/#{self.name}"
    self.git_repository =  if Dir.exists? path
                             Git.open path
                           else
                             Git.clone self.url, path
                           end
  end

  def save
    ActiveRecord::Base.transaction do
      repository = GemTracker::Repository.where(name: name, url: url).first_or_create
      branch = GemTracker::Branch.where(repository_id: repository.id, name: git_repository.current_branch).first_or_create
      errors.add(:base, repository.errors.full_messages) unless repository.valid?
      errors.add(:base, branch.errors.full_messages) unless branch.valid?
      git_repository.log.object("Gemfile.lock").each do |commit|
        gemfile = GemTracker::GemfileVersion.where(commit_id: commit.objectish, branch_id: branch.id).first_or_create
        save_gems gemfile
      end
      fail ActiveRecord::Rollback if errors.any?
    end
    errors.empty?
  end

  private

  def save_gems gemfile_version
    gems = retrieve_gems gemfile_version.commit_id
    gems.each do |g|
      gem = GemTracker::Gem.where(name: g.name.to_s).first_or_create
      GemTracker::GemVersion.where(gem_id: gem.id, version: g.version.to_s).first_or_create
    end
  end

  def retrieve_gems commit_id
    git_repository.reset_hard
    git_repository.pull
    git_repository.revert(commit_id)
    file = File.new "#{path}/Gemfile.lock"
    gemfile = Bundler::LockfileParser.new file.read
    gemfile.specs
  end

end