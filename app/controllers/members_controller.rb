class MembersController < ApplicationController
  before_action :authenticate_user!

  def show
    user = get_user_from_token
    render json: {
      message: "You're In",
      user: user
    }
  end

  private 

  def get_user_from_token
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1],
                        Rails.application.credentials.jwt_secret_key)
    user_id = jwt_payload[0]['sub']
    user = User.find(user_id.to_s)
  end
end