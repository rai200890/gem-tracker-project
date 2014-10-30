module ProjectRepresenter
  include Roar::Representer::JSON

  property :url
  property :name
  property :repository
  property :branches

end
