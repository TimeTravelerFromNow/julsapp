class MusicsController < ApplicationController
  before_action :set_music, only: %i[ show edit update destroy ]

  # GET /musics or /musics.json
  def index
    @musics = Music.all
  end

  # GET /musics/1 or /musics/1.json
  def show
  end

  # GET /musics/new
  def new
    @music = Music.new
  end

  # GET /musics/1/edit
  def edit
  end

  # POST /musics or /musics.json
  def create

    @music = Music.new(music_params)
    @album = @music.album


    respond_to do |format|
      music_file_name = ""
      if music_params["music_file"] == nil && !( @music.single? )
         format.html { redirect_to edit_album_path(@album), notice: "please upload a music file." }
         format.json { render :show, status: :unprocessable_entity, location: @album }
      else
        if music_params["name"] == ""
          music_file_name = @music.music_file.filename

          @music.name = music_file_name
        end
        if @music.save
          if @music.single?
            format.html { redirect_to music_index_path, notice: "Music was successfully created." }
            format.json { render :show, status: :created, location: @music }
          else
            format.html { redirect_to edit_album_path(@album), notice: "new music added to album" }
          end
        else
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: @music.errors, status: :unprocessable_entity }
        end
      end


    end
  end

  # PATCH/PUT /musics/1 or /musics/1.json
  def update
      respond_to do |format|
      if @music.update(music_params)
          if @music.single?
            format.html { redirect_to music_url(@music), notice: "Music was successfully updated." }
            format.json { render :show, status: :ok, location: @music }
        else
          redirect_to edit_album_path(@music.album)

        end
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @music.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /musics/1 or /musics/1.json
  def destroy
    if @music.destroy
      respond_to do |format|
        format.html { redirect_to request.referrer, notice: "deletion successful"}
      end
    else
      respond_to do |format|
        format.html { redirect_to request.referrer, notice: "deletion error"}
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_music
      @music = Music.find(params[:id])
      if @music.single?
      else
        @album = Album.find(params[:album_id])
      end
    end

    # Only allow a list of trusted parameters through.
    def music_params
      params.require(:music).permit(:name, :music_file, :single_cover_image, :album_id)
    end
end
