module GitRepositoryRepresenter
  include Roar::Representer::JSON
  
  property :branches  
  property :url  
  property :name  
end
