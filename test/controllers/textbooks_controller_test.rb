require "test_helper"

class TextbooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @textbook = textbooks(:one)
  end

  test "should get index" do
    get textbooks_url, as: :json
    assert_response :success
  end

  test "should create textbook" do
    assert_difference("Textbook.count") do
      post textbooks_url, params: { textbook: { isbn: @textbook.isbn, title: @textbook.title } }, as: :json
    end

    assert_response :created
  end

  test "should show textbook" do
    get textbook_url(@textbook), as: :json
    assert_response :success
  end

  test "should update textbook" do
    patch textbook_url(@textbook), params: { textbook: { isbn: @textbook.isbn, title: @textbook.title } }, as: :json
    assert_response :success
  end

  test "should destroy textbook" do
    assert_difference("Textbook.count", -1) do
      delete textbook_url(@textbook), as: :json
    end

    assert_response :no_content
  end
end
