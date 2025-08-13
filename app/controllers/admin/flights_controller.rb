class Admin::FlightsController < AdminController
  before_action :set_admin_flight, only: %i[ show edit update destroy ]

  # GET /admin/flights or /admin/flights.json
  def index
    @admin_flights = Flight.all
  end

  # GET /admin/flights/1 or /admin/flights/1.json
  def show
  end

  # GET /admin/flights/new
  def new
    @admin_flight = Flight.new
  end

  # GET /admin/flights/1/edit
  def edit
  end

  # POST /admin/flights or /admin/flights.json
  def create
    @admin_flight = Flight.new(admin_flight_params)

    respond_to do |format|
      if @admin_flight.save
        format.html { redirect_to admin_flight_path(@admin_flight), notice: "Flight was successfully created." }
        format.json { render :show, status: :created, location: @admin_flight }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @admin_flight.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/flights/1 or /admin/flights/1.json
  def update
    respond_to do |format|
      if @admin_flight.update(admin_flight_params)
        format.html { redirect_to admin_flight_path(@admin_flight), notice: "Flight was successfully updated." }
        format.json { render :show, status: :ok, location: @admin_flight }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @admin_flight.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/flights/1 or /admin/flights/1.json
  def destroy
    @admin_flight.destroy!

    respond_to do |format|
      format.html { redirect_to admin_flights_path, status: :see_other, notice: "Flight was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_flight
      @admin_flight = Flight.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def admin_flight_params
      params.require(:flight).permit(:airline, :origin, :destination, :departure_date, :arrival_date, :price)
    end
end
