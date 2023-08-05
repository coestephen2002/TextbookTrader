class CreateTextbooks < ActiveRecord::Migration[7.0]
  def change
    create_table :textbooks do |t|
      t.text :title
      t.text :isbn

      t.timestamps
    end
  end
end
