class GemTracker::Gemfile
  include ActiveModel::Validations
  include ActiveModel::Conversion
  include ActiveModel::Translation
  extend ActiveModel::Naming

  attr_accessor :commit_id, :branch_id, :gems

  def initialize(params)
    self.commit_id = params[:commit_id]
    self.branch_id = params[:branch_id]
    self.gems = params[:gems]
  end

  def self.create(params)
    gemfile = GemTracker::Gemfile.new(params)
    gemfile.save
    gemfile
  end

  def save
    ActiveRecord::Base.transaction do
      gems.each do |g|
        gemfile = GemTracker::GemfileVersion.where(commit_id: commit_id, branch_id: branch_id).first_or_create
        gem = GemTracker::Gem.where(name: g.name.to_s).first_or_create
        GemTracker::GemVersion.where(gem_id: gem.id, version: g.version.to_s).first_or_create
        errors.add(:base, gemfile.errors.full_messages) unless gemfile.valid?
        errors.add(:base, gem.errors.full_messages) unless gem.valid?
      end
      fail ActiveRecord::Rollback if errors.any?
    end
    errors.empty?
  end

end