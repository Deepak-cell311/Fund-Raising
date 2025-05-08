import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star } from 'lucide-react';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="mb-10">
        <div className="flex items-center">
          <MessageSquare className="w-8 h-8 text-orange-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
        </div>
        <p className="mt-2 text-gray-600">Help us improve your fundraising experience</p>
      </header>

      <motion.div
        className="bg-white rounded-xl shadow-sm p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How would you rate your experience?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onHoverStart={() => setHoveredRating(star)}
                  onHoverEnd={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              rows={4}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Share your thoughts and suggestions..."
            />
          </div>

          <div>
            <label htmlFor="improvements" className="block text-sm font-medium text-gray-700 mb-2">
              What can we improve?
            </label>
            <div className="space-y-2">
              {['User Interface', 'Campaign Creation', 'Donation Process', 'Support'].map((item) => (
                <label key={item} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Feedback
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Feedback;