class HomeController <ApplicationController
  def index
    @main_catoegories = Category.take(4)
 end
end
