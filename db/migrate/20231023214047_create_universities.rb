class CreateUniversities < ActiveRecord::Migration[7.0]
  def change
    create_table :universities do |t|
      t.text :name

      t.timestamps
    end
  end
end
