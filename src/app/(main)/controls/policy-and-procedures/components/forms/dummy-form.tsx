import React from "react";

export const ContactForm: React.FC = () => {
  return (
    <form className="max-w-md mx-auto p-6 border rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Contact Us</h2>
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="Your name"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          placeholder="Your message"
          rows={4}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export const LoginForm: React.FC = () => {
  return (
    <form className="max-w-md mx-auto p-6 border rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Login</h2>
      <div>
        <label
          htmlFor="login-username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="login-username"
          type="text"
          placeholder="Username"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="login-password"
          type="password"
          placeholder="Password"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div className="flex items-center">
        <input
          id="remember-me"
          type="checkbox"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-sm text-gray-700"
        >
          Remember me
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        Login
      </button>
    </form>
  );
};

export const SignupForm: React.FC = () => {
  return (
    <form className="max-w-md mx-auto p-6 border rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Sign Up</h2>
      <div>
        <label
          htmlFor="signup-name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          id="signup-name"
          type="text"
          placeholder="Your full name"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="signup-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          placeholder="you@example.com"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="signup-password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          placeholder="Password"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="signup-confirm-password"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="signup-confirm-password"
          type="password"
          placeholder="Confirm your password"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        Sign Up
      </button>
    </form>
  );
};

export const FeedbackForm: React.FC = () => {
  return (
    <form className="max-w-md mx-auto p-6 border rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Feedback</h2>
      <div>
        <label
          htmlFor="feedback-rating"
          className="block text-sm font-medium text-gray-700"
        >
          Rating
        </label>
        <select
          id="feedback-rating"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
          defaultValue="5"
        >
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="feedback-subject"
          className="block text-sm font-medium text-gray-700"
        >
          Subject
        </label>
        <input
          id="feedback-subject"
          type="text"
          placeholder="Subject"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="feedback-comments"
          className="block text-sm font-medium text-gray-700"
        >
          Comments
        </label>
        <textarea
          id="feedback-comments"
          placeholder="Your comments"
          rows={4}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="feedback-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email (optional)
        </label>
        <input
          id="feedback-email"
          type="email"
          placeholder="you@example.com"
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        Submit Feedback
      </button>
    </form>
  );
};
