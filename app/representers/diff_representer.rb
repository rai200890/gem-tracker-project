class DiffRepresenter < Roar::Decorator
  include Roar::Representer::JSON

  property :included, getter: ->(args){
    self.included.map{ |gem| {gem_name: gem.gem_name, version: gem.version} }
  }

  property :removed, getter: ->(args){
    self.removed.map{ |gem| {gem_name: gem.gem_name, version: gem.version} }
  }

  property :updated, getter: ->(args){
    self.updated.map{ |gem| {gem_name: gem.gem_name, version: gem.version} }
  }

  property :unchanged, getter: ->(args){
    self.unchanged.map{ |gem| {gem_name: gem.gem_name, version: gem.version} }
  }
end
