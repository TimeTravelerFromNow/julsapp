class BlogPost < ApplicationRecord

  include Visible


  has_one_attached :header_image

  has_many :elements

  belongs_to :category, optional: true

  def uncategorized?
    return :category == nil
  end
end
