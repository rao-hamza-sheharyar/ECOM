require "test_helper"

class Admin::FlightsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_flight = admin_flights(:one)
  end

  test "should get index" do
    get admin_flights_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_flight_url
    assert_response :success
  end

  test "should create admin_flight" do
    assert_difference("Admin::Flight.count") do
      post admin_flights_url, params: { admin_flight: { airline: @admin_flight.airline, arrival_date: @admin_flight.arrival_date, departure_date: @admin_flight.departure_date, destination: @admin_flight.destination, origin: @admin_flight.origin, price: @admin_flight.price } }
    end

    assert_redirected_to admin_flight_url(Admin::Flight.last)
  end

  test "should show admin_flight" do
    get admin_flight_url(@admin_flight)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_flight_url(@admin_flight)
    assert_response :success
  end

  test "should update admin_flight" do
    patch admin_flight_url(@admin_flight), params: { admin_flight: { airline: @admin_flight.airline, arrival_date: @admin_flight.arrival_date, departure_date: @admin_flight.departure_date, destination: @admin_flight.destination, origin: @admin_flight.origin, price: @admin_flight.price } }
    assert_redirected_to admin_flight_url(@admin_flight)
  end

  test "should destroy admin_flight" do
    assert_difference("Admin::Flight.count", -1) do
      delete admin_flight_url(@admin_flight)
    end

    assert_redirected_to admin_flights_url
  end
end
