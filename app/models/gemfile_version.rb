class GemfileVersion < ActiveRecord::Base

belongs_to :branch
has_many :gem_versions 

end
