class CreateGems < ActiveRecord::Migration
  def change
    create_table :gems do |t|
      t.string :name
      t.string :source
    end
  end
end
