class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:create]
  before_action :set_user, only: [:show, :update, :destroy]

  rescue_from ActionController::ParameterMissing, with: :handle_parameter_missing

  # GET /users
  def index
    @users = User.all 

    render :index
  end

  # GET /users/1
  def show
    render :show
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render :show
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  def handle_parameter_missing(exception)
    render json: { error: exception.message }, status: :bad_request
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :last_name, :email, :password, :password_confirmation, :address1, :address2, :type, :image)
    end
end
