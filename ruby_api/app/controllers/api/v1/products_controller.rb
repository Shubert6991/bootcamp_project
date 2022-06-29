class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  rescue_from ActionController::ParameterMissing, with: :handle_parameter_missing

  # GET /products
  def index
    @products = Product.all 

    render :index
  end

  # GET /products/byprice
  def byprice
    @products = Product.ordered_by_price 

    render :index
  end

  # GET /products/1
  def show
    render :show
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      render :show
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      render :show
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy
  end

  def handle_parameter_missing(exception)
    render json: { error: exception.message }, status: :bad_request
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.require(:product).permit(:name, :description, :price, :stock, :image)
    end
end
