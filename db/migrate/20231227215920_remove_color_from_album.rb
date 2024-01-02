class RemoveColorFromAlbum < ActiveRecord::Migration[7.0]
  def change
    remove_column :albums, :color
  end
end
