class AddColorToAlbums < ActiveRecord::Migration[7.0]
  def change
    add_column :albums, :color, :string
  end
end
