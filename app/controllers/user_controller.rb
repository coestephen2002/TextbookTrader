class UserController < ApplicationController
  def update
    puts(user_params)

    @user = User.find(params[:id])

    if @user.update(user_params)
      render json: {
        user: @user
      }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

    def user_params
      params.require(:user).permit(:id, :university_id)
    end
end
