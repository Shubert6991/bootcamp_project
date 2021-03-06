# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  name            :string
#  last_name       :string
#  email           :string
#  password_digest :string
#  address1        :string
#  address2        :string
#  user_type       :integer          default(2)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  require 'securerandom'
  include Rails.application.routes.url_helpers
  
  validates :name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i }
  validates :address1, presence: true

  has_one_attached :image
  has_many :shopping_carts

  def image_url
    if image.attached?
      url_for(self.image)
    else
      "https://bootcamp-ruby-shubert.s3.us-west-1.amazonaws.com/default/profile.png"
    end
  end

  has_secure_password
  validates_with PasswordValidator
end
