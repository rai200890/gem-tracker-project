# Be sure to restart your server when you modify this file.

# Add new inflection rules using the following format. Inflections
# are locale specific, and you may define rules for as many different
# locales as you wish. All of these examples are active by default:
 ActiveSupport::Inflector.inflections(:en) do |inflect|
   inflect.irregular 'repository', 'repositories'
   inflect.irregular 'branch', 'branches'
   inflect.irregular 'gemfile_version', 'gemfile_versions'
   inflect.irregular 'gem_version', 'gem_versions'
 end

# These inflection rules are supported but not enabled by default:
# ActiveSupport::Inflector.inflections(:en) do |inflect|
#   inflect.acronym 'RESTful'
# end
