class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.string :address1
      t.string :address2
      # t.text :image, default: 'https://bootcamp-ruby-shubert.s3.us-west-1.amazonaws.com/default/profile.png' 
      # t.text :image_url, default: 'https://bootcamp-ruby-shubert.s3.us-west-1.amazonaws.com/default/profile.png' 
      t.int :user_type, default: 2

      t.timestamps
    end
  end
end
