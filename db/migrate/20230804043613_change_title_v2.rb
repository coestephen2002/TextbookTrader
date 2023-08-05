class ChangeTitleV2 < ActiveRecord::Migration[7.0]
  def change
    def change
      change_table :textbooks do |t|
        t.change :title, :string
      end
    end
  end
end
