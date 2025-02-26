import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"; // adjust the path as needed

const ReviewForm = () => {
  // State to store review details
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  // For guest users
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  // Logged-in user details (if available)
  const [user, setUser] = useState(null);
  // To display a feedback message after submission
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Check local storage for user info and query the users table if logged in
  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    if (storedUserEmail) {
      const fetchUserDetails = async () => {
        const { data, error } = await supabase
          .from("users")
          .select("id, full_name, email")
          .eq("email", storedUserEmail)
          .single();
        if (error) {
          console.error("Error fetching user details:", error);
        } else {
          setUser(data);
        }
      };
      fetchUserDetails();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the review payload based on whether the user is logged in or a guest
    const reviewData = {
      rating,
      review_text: reviewText,
      // Always store reviews as pending moderation (or approved automatically as per your business logic)
      is_approved: false,
    };

    if (user) {
      reviewData.user_id = user.id;
      reviewData.reviewer_name = user.full_name;
      reviewData.reviewer_email = user.email;
    } else {
      reviewData.reviewer_name = guestName;
      reviewData.reviewer_email = guestEmail;
    }

    // Insert the review into the database
    const { error } = await supabase.from("reviews").insert(reviewData);
    if (error) {
      console.error("Error submitting review:", error);
      setFeedbackMsg("There was an error submitting your review. Please try again.");
    } else {
      setFeedbackMsg("Thank you! Your review has been submitted successfully.");
      // Clear the form
      setRating(0);
      setReviewText("");
      setGuestName("");
      setGuestEmail("");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded mt-16 mx-auto">
  
  
    {/* Your content goes here */}
  
  
      <h2 className="text-2xl font-bold mb-4 text-center">Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        {/* Rating Section */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating:</label>
          <div className="flex flex-wrap items-center gap-4">


            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={num}
                  checked={rating === num}
                  onChange={() => setRating(num)}
                  className="mr-1"
                  required
                />
                {num} Star{num > 1 && "s"}
              </label>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Review:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            rows="4"
            placeholder="Write your review here..."
            required
          />
        </div>

        {/* If guest, collect additional details */}
        {!user && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Name:</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Email:</label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter your email"
                required
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-700 text-white py-2 rounded hover:bg-yellow-600 transition-colors"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* Success/Error Prompt */}
      {feedbackMsg && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded text-center">
          {feedbackMsg}
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
