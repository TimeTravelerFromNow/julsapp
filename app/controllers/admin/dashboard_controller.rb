class DashboardController < ApplicationController
  def index
    @categories = Category.all
    @albums = Album.all
    @blog_posts = BlogPost.all
    @musics = Music.all
  end
end
