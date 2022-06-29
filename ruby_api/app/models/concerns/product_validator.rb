class ProductValidator < ActiveModel::Validator

  def validate(record)
    validate_stock(record)
  end

  def validate_stock(record)
    record.errors.add :stock, message: "Stock needs to be more than 0" unless record.stock > 0
  end

end