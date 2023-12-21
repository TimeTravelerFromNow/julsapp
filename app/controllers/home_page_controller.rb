class HomePageController < ApplicationController
  def index
    @albums = Album.all
    @musics = Music.all
    @blog_posts = BlogPost.all
  end
end
