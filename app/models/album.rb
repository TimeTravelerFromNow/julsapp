class Album < ApplicationRecord

  has_one_attached :album_cover_image
  has_many :musics

  has_rich_text :story
  has_many :elements
end
