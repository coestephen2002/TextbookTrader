class TextbooksController < ApplicationController
  before_action :set_textbook, only: %i[ show update destroy ]

  # GET /textbooks
  def index
    @textbooks = Textbook.all

    render json: @textbooks
  end

  # GET /textbooks/1
  def show
    render json: @textbook
  end

  # POST /textbooks
  def create
    @textbook = Textbook.new(textbook_params)

    if @textbook.save
      render json: @textbook, status: :created, location: @textbook
    else
      render json: @textbook.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /textbooks/1
  def update
    if @textbook.update(textbook_params)
      render json: @textbook
    else
      render json: @textbook.errors, status: :unprocessable_entity
    end
  end

  # DELETE /textbooks/1
  def destroy
    @textbook.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_textbook
      @textbook = Textbook.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def textbook_params
      params.require(:textbook).permit(:id, :title, :isbn)
    end
end
