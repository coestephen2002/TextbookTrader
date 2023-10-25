class UniversitiesController < ApplicationController

  # GET /universities
  def index
    @universities = University.all

    render json: @universities
  end
end
