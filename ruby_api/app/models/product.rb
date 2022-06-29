# == Schema Information
#
# Table name: products
#
#  id          :bigint           not null, primary key
#  description :string
#  name        :string
#  price       :float
#  sku         :string
#  stock       :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Product < ApplicationRecord
  include Rails.application.routes.url_helpers

  before_create :generate_sku
  before_update :out_of_stock, if: :stock_is_changed?
  after_save    :notify_product_saved

  validates :name, presence: true
  validates :description, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 1, message: 'The price (%{value}) needs to be more than 0' }

  validates_with ProductValidator
  validates :sku, uniqueness: { message: 'Product already exists' }

  has_one_attached :image

  scope :ordered_by_price, -> { order(price: :asc) }

  def stock_is_changed?
    stock_was != stock && stock < 5
  end

  def out_of_stock
    Rails.logger.info { "Warning! Product #{name} is almost out of stock" }
  end

  def notify_product_saved
    Rails.logger.info { "Product #{name}:#{sku} saved successfully" }
  end

  def generate_sku
    self.sku = "ITEM#{[*0..9].shuffle[0..5].join}-#{Date.today.strftime("%Y%m%d")}"
  end

  def image_url
    if image.attached?
      url_for(self.image)
    else
      "https://bootcamp-ruby-shubert.s3.us-west-1.amazonaws.com/default/product.png"
    end
  end
end
