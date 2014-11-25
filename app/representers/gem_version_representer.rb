class GemVersionRepresenter < Roar::Decorator
  include Roar::Representer::JSON

  property :id
  property :gem_id
  property :name
end