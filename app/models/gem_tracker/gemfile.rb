class GemTracker::Gemfile
  include ActiveModel::Model

  attr_accessor :commit_id, :branch_id, :date, :commit_message, :commit_author, :gems

  def initialize(params)
    # self.commit_id = params[:commit_id]
    # self.commit_message = params[:commit_message]
    # self.commit_author = params[:commit_author]
    # self.branch_id = params[:branch_id]
    # self.date = params[:date]
    # self.gems = params[:gems]
  end

  def self.create(params)
    gemfile = GemTracker::Gemfile.new(params)
    gemfile.save
    gemfile
  end

  def save
    ActiveRecord::Base.transaction do
      unless GemTracker::GemfileVersion.where(branch_id: branch_id, commit_id: commit_id).exists?
        gemfile_version = GemTracker::GemfileVersion.create(commit_id: commit_id, branch_id: branch_id,
                                                            date: date, commit_message: commit_message,
                                                            commit_author: commit_author)
        gems.each do |g|
          gem = GemTracker::Gem.where(name: g.name.to_s).first_or_create
          gem_version = GemTracker::GemVersion.where(gem_id: gem.id, version: g.version.to_s).first_or_create
          gemfile_version.gem_versions << gem_version unless gemfile_version.gem_versions.include? gem_version
          errors.add(:base, gem.errors.full_messages) unless gem.valid?
          errors.add(:base, gem_version.errors.full_messages) unless gem_version.valid?
          errors.add(:base, gemfile_version.errors.full_messages) unless gemfile_version.valid?
        end
        fail ActiveRecord::Rollback if self.errors.any?
      end
    end
    errors.empty?
  end

end