json.extract! admin_flight, :id, :airline, :origin, :destination, :departure_date, :arrival_date, :price, :created_at, :updated_at
json.url admin_flight_url(admin_flight, format: :json)
