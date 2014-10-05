class Branch < ActiveRecord::Base

belongs_to :repository
has_many :gemfile_versions


end
