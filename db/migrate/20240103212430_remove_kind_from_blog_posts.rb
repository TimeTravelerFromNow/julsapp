class RemoveKindFromBlogPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :blog_posts, :kind
  end
end
