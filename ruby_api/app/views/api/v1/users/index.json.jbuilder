json.array! @users do |user|
  json.id user.id
  json.name user.name
  json.last_name user.last_name
  json.email user.email
  json.address1 user.address1
  json.address2 user.address2
  json.image_url user.image_url
end