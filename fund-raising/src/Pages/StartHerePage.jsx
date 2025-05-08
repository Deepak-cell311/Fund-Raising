import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';

const StartHerePage = () => {
  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Getting Started</h1>
        <p className="mt-2 text-gray-600">Welcome to NayePankh Foundation's fundraising platform!</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="ml-4 text-xl font-semibold">Quick Start Guide</h2>
          </div>
          <ul className="space-y-4">
            {[
              "Set up your fundraiser profile",
              "Create your first campaign",
              "Share with friends and family",
              "Track your progress"
            ].map((step, index) => (
              <motion.li
                key={index}
                className="flex items-center text-gray-700"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <ArrowRight className="w-4 h-4 text-orange-500 mr-2" />
                {step}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-xl font-semibold mb-4">Resources</h2>
          <div className="space-y-4">
            {[
              { title: "Fundraising Tips", description: "Learn effective strategies for successful fundraising" },
              { title: "Social Media Guide", description: "Maximize your reach on social platforms" },
              { title: "Success Stories", description: "Get inspired by other fundraisers" }
            ].map((resource, index) => (
              <motion.div
                key={index}
                className="p-4 border border-gray-100 rounded-lg"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-medium text-gray-900">{resource.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StartHerePage;