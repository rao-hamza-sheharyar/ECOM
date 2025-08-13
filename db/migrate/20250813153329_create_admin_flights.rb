class CreateAdminFlights < ActiveRecord::Migration[7.2]
  def change
    create_table :flights do |t|
      t.string :airline
      t.string :origin
      t.string :destination
      t.date :departure_date
      t.date :arrival_date
      t.decimal :price

      t.timestamps
    end
  end
end
