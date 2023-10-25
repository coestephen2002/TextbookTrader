require "test_helper"

class UniversitiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @university = universities(:one)
  end

  test "should get index" do
    get universities_url, as: :json
    assert_response :success
  end

  test "should create university" do
    assert_difference("University.count") do
      post universities_url, params: { university: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show university" do
    get university_url(@university), as: :json
    assert_response :success
  end

  test "should update university" do
    patch university_url(@university), params: { university: {  } }, as: :json
    assert_response :success
  end

  test "should destroy university" do
    assert_difference("University.count", -1) do
      delete university_url(@university), as: :json
    end

    assert_response :no_content
  end
end
