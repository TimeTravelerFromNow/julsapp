class AdminController < ApplicationController
  http_basic_authenticate_with name: "seb", password: "seb123"

  #layout 'authors'
end
