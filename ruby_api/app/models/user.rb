# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  name            :string(255)
#  last_name       :string(255)
#  email           :string(255)
#  password        :string(255)
#  address1        :string(255)
#  address2        :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  image           :text(65535)
#  user_type            :int
#
class User < ApplicationRecord
  include Rails.application.routes.url_helpers

  
  validates :name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i }
  validates :address1, presence: true

  has_one_attached :image

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
