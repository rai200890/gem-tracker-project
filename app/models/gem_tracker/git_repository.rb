class  GemTracker::GitRepository

  attr_accessor :url, :path, :git

  TMP_PATH = Rails.root.join("tmp","git")
  LOG_LIMIT = 1000000000

  def initialize params
    self.path = "#{TMP_PATH}/#{params[:name]}"
    self.url = params[:url]
    FileUtils.rmtree(path) if Dir.exists?(path)
    self.git = Git.clone(url, path)
  end

  def commit_ids
    git.log(LOG_LIMIT).object("Gemfile.lock").map{|c| c.objectish}
  end

  def gems commit_id
    git.fetch
    git.reset
    git.reset(commit_id)
    file = File.new "#{path}/Gemfile.lock"
    gemfile = Bundler::LockfileParser.new file.read
    gemfile.specs
  end

end