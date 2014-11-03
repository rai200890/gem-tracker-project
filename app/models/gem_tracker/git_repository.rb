class  GemTracker::GitRepository
  include ActiveModel::Model

  attr_accessor :url, :name

  TMP_PATH = Rails.root.join("tmp","git")
  LOG_LIMIT = 1000000000

  def initialize params = {}
    begin
      @path = "#{TMP_PATH}/#{params[:name]}"
      self.url = params[:url]
      @git = Dir.exists?(@path) ? Git.open(@path) : Git.clone(self.url, @path)
      @git.reset_hard
      @git.pull
    rescue Exception => e
      self.errors.add(:base, 'Error in repository. Check if the url is correct.')
    end
  end

  def current_branch
    @git.current_branch
  end

  def commits
    @git.log(LOG_LIMIT).object("Gemfile.lock").map{|c| c}.reverse
  end

  def branches
    @git.branches.local.to_a.map{|b| b.try :name}
  end

  def checkout branch
    @git.reset_hard
    @git.pull
    @git.checkout branch
  end

  def gems branch = 'master', commit_id
    checkout branch
    @git.checkout_file(commit_id, "Gemfile.lock")
    file = File.new "#{@path}/Gemfile.lock"
    gemfile = Bundler::LockfileParser.new file.read
    gemfile.specs
  end

end