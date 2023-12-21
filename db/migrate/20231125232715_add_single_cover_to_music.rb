class AddSingleCoverToMusic < ActiveRecord::Migration[7.0]
  def change
    add_column :musics, :has_single_cover_image, :boolean
  end
end
