class  GemTracker::GitRepository

  attr_accessor :url, :path, :git

  TMP_PATH = Rails.root.join("tmp","git")
  LOG_LIMIT = 1000000000

  def initialize params
    self.path = "#{TMP_PATH}/#{params[:name]}"
    self.url = params[:url]
    #FileUtils.rmtree(path)
    self.git = Dir.exists?(path) ? Git.open(path) : Git.clone(url, path)
    self.git.reset("HEAD")
    self.git.pull
  end

  def commits
    git.log(LOG_LIMIT).object("Gemfile.lock").map{|c| c}
  end

  def gems commit_id
    git.checkout_file(commit_id, "Gemfile.lock")
    file = File.new "#{path}/Gemfile.lock"
    gemfile = Bundler::LockfileParser.new file.read
    gemfile.specs
  end

end