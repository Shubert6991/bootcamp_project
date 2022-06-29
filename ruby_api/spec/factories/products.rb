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
FactoryBot.define do
  factory :product do
    sku { "MyString" }
    name { "MyString" }
    description { "MyString" }
    stock { 1 }
    price { 1.5 }
  end
end
