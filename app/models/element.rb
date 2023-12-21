class Element < ApplicationRecord
  belongs_to :blog_post

  validates :kind, inclusion: { in: ['paragraph', 'image', 'ext_link'] }
  has_rich_text :content
  has_one_attached :image

  def paragraph?
    kind == 'paragraph'
  end

  def image?
    kind == 'image'
  end

  def link?
    kind == 'ext_link'
  end
end
