class ChangeTextbookTitleToString < ActiveRecord::Migration[7.0]
  def change
    change_table :textbooks do |t|
      t.change :title, :text
    end
  end
end
