class BlogPost < ApplicationRecord

  include Visible


  has_one_attached :header_image

  has_many :elements
end
