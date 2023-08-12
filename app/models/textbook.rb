class Textbook < ApplicationRecord
  validates :title, presence: true
  validates :isbn, presence: true, numericality: { only_integer: true }
end
