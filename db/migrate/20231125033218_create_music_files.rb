class CreateMusicFiles < ActiveRecord::Migration[7.0]
  def change
    create_table :music_files do |t|

      t.timestamps
    end
  end
end
