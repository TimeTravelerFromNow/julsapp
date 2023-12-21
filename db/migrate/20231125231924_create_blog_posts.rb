class CreateBlogPosts < ActiveRecord::Migration[7.0]
  def change
    create_table :blog_posts do |t|
      t.string :title
      t.string :description
      t.string :status
      t.string :kind

      t.timestamps
    end
  end
end
