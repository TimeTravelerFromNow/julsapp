class BlogPost < ApplicationRecord

  include Visible


  has_one_attached :header_image

  has_many :elements

  belongs_to :category, optional: true

  def uncategorized?
    return :category == nil
  end

  def private?
    return self.status == "private"
  end

  def archived?
    return self.status == "archived"
  end

  def public?
    return self.status == "public"
  end

  def status_color
    case self.status
    when "private"
      return "red"
    when "public"
      return "green"
    when "archived"
      return "orange"
    else
      return "green"
    end
  end
end
