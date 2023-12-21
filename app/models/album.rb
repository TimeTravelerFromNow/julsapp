class Album < ApplicationRecord

  has_one_attached :album_cover_image
  has_many :musics

  has_rich_text :story
  has_many :elements

  def customColorPrimary
    if color == "blue"
      return "#9acdef"
    elsif color == "red"
      return "#ec4a41"
    elsif color == "green"
      return "#14a437"
    end

    return "red"
  end
  def customColorSecondary
    if color == "blue"
      return "#2088cc"
    elsif color == "red"
      return "#c41d14"
    elsif color == "green"
      return "#0a581e"

    end

    return "blue"
  end
end
