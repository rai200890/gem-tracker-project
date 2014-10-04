class CreateBranches < ActiveRecord::Migration
  def change
    create_table :branches do |t|
      t.string :repository_id
      t.string :integer
      t.string :name
    end
  end
end
