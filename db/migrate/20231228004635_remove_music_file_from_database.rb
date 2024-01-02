class RemoveMusicFileFromDatabase < ActiveRecord::Migration[7.0]
  def change

    drop_table :music_files
    drop_table :musics
  end
end
