module ProjectRepresenter
  include Roar::Representer::JSON

  property :url
  property :name
  property :master_branch
  property :repository
  property :branches

end
