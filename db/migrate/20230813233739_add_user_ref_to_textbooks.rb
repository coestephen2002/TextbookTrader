class AddUserRefToTextbooks < ActiveRecord::Migration[7.0]
  def change
    add_reference :textbooks, :user, foreign_key: true
  end
end
