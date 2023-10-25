require 'csv'
namespace :import do
  task :create_universities => :environment do
    file = 'us_universities.csv'
    CSV.foreach(file, headers: true) do |row|
      university_hash = row.to_hash
      University.create!(university_hash)
    end
  end
end