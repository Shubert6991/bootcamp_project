json.array! @products do |product|
  json.id product.id
  json.sku product.sku
  json.name product.name
  json.description product.description
  json.price product.price
  json.stock product.stock
  json.image_url product.image_url
end