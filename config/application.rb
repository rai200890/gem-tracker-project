require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GemTrackerProject
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
    config.assets.paths << Rails.root.join('bower_components')
    config.assets.paths << "#{Rails.root}/app/assets/templates"

    # Eager load all value objects, as they may be instantiated from
    # YAML before the symbol is referenced
    config.before_initialize do |app|
      app.config.paths.add 'app/models/gem_tracker', :eager_load => true
    end

# Reload cached/serialized classes before every request (in development
# mode) or on startup (in production mode)
    config.to_prepare do
      Dir[ File.expand_path(Rails.root.join("app/models/gem_tracker/*.rb")) ].each do |file|
        require_dependency file
      end
    end
  end
end
