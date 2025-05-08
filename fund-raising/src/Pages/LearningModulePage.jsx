import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, Lock } from 'lucide-react';

const modules = [
  {
    title: "Fundraising Basics",
    description: "Learn the fundamentals of effective fundraising",
    duration: "30 mins",
    status: "completed"
  },
  {
    title: "Social Media Strategy",
    description: "Master social media for maximum impact",
    duration: "45 mins",
    status: "in-progress"
  },
  {
    title: "Storytelling for Impact",
    description: "Craft compelling stories that inspire donations",
    duration: "1 hour",
    status: "locked"
  },
  {
    title: "Advanced Fundraising Techniques",
    description: "Take your fundraising to the next level",
    duration: "1.5 hours",
    status: "locked"
  }
];

const LearningModules = () => {
  return (
    <motion.div
      className="max-w-6xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Learning Modules</h1>
        <p className="mt-2 text-gray-600">Enhance your fundraising skills with our comprehensive learning modules</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                  <h2 className="ml-3 text-xl font-semibold text-gray-900">{module.title}</h2>
                </div>
                {module.status === "locked" ? (
                  <Lock className="w-5 h-5 text-gray-400" />
                ) : module.status === "completed" ? (
                  <Award className="w-5 h-5 text-green-500" />
                ) : null}
              </div>
              <p className="text-gray-600 mb-4">{module.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>{module.duration}</span>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  module.status === "locked"
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
                disabled={module.status === "locked"}
              >
                {module.status === "completed"
                  ? "Review Module"
                  : module.status === "in-progress"
                  ? "Continue Learning"
                  : "Start Module"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LearningModules;