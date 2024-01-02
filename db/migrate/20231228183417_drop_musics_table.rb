class DropMusicsTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :musics
  end
end
