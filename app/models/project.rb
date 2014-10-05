class Project
  include ActiveModel::Validations
  include ActiveModel::Conversion
  include ActiveModel::Translation
  extend ActiveModel::Naming

  attr_accessor :git_repository, :path

  TMP_PATH = Rails.root.join("tmp","git")

  def initialize(params = {})
    self.path = "#{TMP_PATH}/#{params[:name]}"
    self.git_repository =  if Dir.exists? path
                             Git.open path
                           else
                             Git.clone params[:url], path
                           end
  end

  def save
    ActiveRecord::Base.transaction do
      repository = Repository.where(params).first_or_create
      branch = Branch.where(repository_id: repository.id, name: git_repository.current_branch).first_or_create
      errors.add(:base, repository.errors.full_messages) if repository.valid?
      errors.add(:base, branch.errors.full_messages) if branch.valid?
      git_repository.log.object("Gemfile.lock").each do |commit|
        GemfileVersion.where(commit_id: commit.objectish, branch_id: branch.id).first_or_create
      end
      fail ActiveRecord::Rollback if errors.any?
    end
    errors.empty?
  end

  def update_attributes(params = {})
    ActiveRecord::Base.transaction do
      #errors.add(:base, dispensa.errors.full_messages).flatten! unless dispensa.valid?

      fail ActiveRecord::Rollback if errors.any?
    end
    errors.empty?
  end

  private


  def save_gems gemfile_version
    git_repository.revert("HEAD")
    git_repository.revert(gemfile_version.commit_id)
    file = File.new "#{path}/Gemfile.lock"
    contents = file.read
    gemfile = Bundler::LockfileParser.new contents
    gems = gemfile.specs
    gems.each do |g|
    end
  end


end