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
FactoryBot.define do
  factory :user do
    name { "MyString" }
    last_name { "MyString" }
    email { "MyString" }
    password { "MyString" }
    address1 { "MyString" }
    address2 { "MyString" }
  end
end
