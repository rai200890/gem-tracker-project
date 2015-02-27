# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'
BASE_URL = case Rails.env
             when :homologacao
               "http://homologacao.ntp.uff.br/sia/sispta"
             when
             "https://sistemas.uff.br/sia/sispta"
             else
               ""
           end
# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
