require "application_system_test_case"

class Admin::FlightsTest < ApplicationSystemTestCase
  setup do
    @admin_flight = admin_flights(:one)
  end

  test "visiting the index" do
    visit admin_flights_url
    assert_selector "h1", text: "Flights"
  end

  test "should create flight" do
    visit admin_flights_url
    click_on "New flight"

    fill_in "Airline", with: @admin_flight.airline
    fill_in "Arrival date", with: @admin_flight.arrival_date
    fill_in "Departure date", with: @admin_flight.departure_date
    fill_in "Destination", with: @admin_flight.destination
    fill_in "Origin", with: @admin_flight.origin
    fill_in "Price", with: @admin_flight.price
    click_on "Create Flight"

    assert_text "Flight was successfully created"
    click_on "Back"
  end

  test "should update Flight" do
    visit admin_flight_url(@admin_flight)
    click_on "Edit this flight", match: :first

    fill_in "Airline", with: @admin_flight.airline
    fill_in "Arrival date", with: @admin_flight.arrival_date
    fill_in "Departure date", with: @admin_flight.departure_date
    fill_in "Destination", with: @admin_flight.destination
    fill_in "Origin", with: @admin_flight.origin
    fill_in "Price", with: @admin_flight.price
    click_on "Update Flight"

    assert_text "Flight was successfully updated"
    click_on "Back"
  end

  test "should destroy Flight" do
    visit admin_flight_url(@admin_flight)
    accept_confirm { click_on "Destroy this flight", match: :first }

    assert_text "Flight was successfully destroyed"
  end
end
