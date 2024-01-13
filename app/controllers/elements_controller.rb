class ElementsController < ApplicationController

    before_action :set_blog_post
    before_action :set_elements, only: [:update, :destroy ]

    # POST /elements or /elements.json
    def create
      bp_elems =  @blog_post.elements
      @element = bp_elems.build(element_params)

      @element.position = bp_elems.count


      if @element.save
        notice = nil
      else
        notice = @element.errors.full_messages.join(". ") << "."
      end
      redirect_to edit_blog_post_path(@blog_post)
    end

    # PATCH/PUT /elements/1 or /elements/1.json
    def update
        @element.update(element_params)
        redirect_to edit_blog_post_path(@element.blog_post)
    end

    # DELETE /elements/1 or /elements/1.json
    def destroy
      @element.destroy
      redirect_to edit_blog_post_path(@element.blog_post)
    end

    private
      def set_blog_post
        @blog_post = BlogPost.find(params[:blog_post_id])
      end

      # Use callbacks to share common setup or constraints between actions.
      def set_elements
        @element = @blog_post.elements.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def element_params
        params.require(:element).permit(:kind, :content, :image)
      end
end
