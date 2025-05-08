import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Shield, Trophy } from 'lucide-react';

const rewards = [
  {
    title: "Star Fundraiser",
    description: "Raise ₹30,000 in your first campaign",
    icon: Star,
    progress: 100,
    achieved: true
  },
  {
    title: "Impact Champion",
    description: "Complete 3 successful campaigns",
    icon: Shield,
    progress: 66,
    achieved: false
  },
  {
    title: "Ninja Level",
    description: "Raise ₹60,000 in total contributions",
    icon: Trophy,
    progress: 50,
    achieved: false
  }
];

const Rewards = () => {
  return (
    <motion.div
      className="max-w-6xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="mb-10">
        <div className="flex items-center">
          <Award className="w-8 h-8 text-orange-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Your Rewards</h1>
        </div>
        <p className="mt-2 text-gray-600">Track your achievements and unlock new rewards</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {rewards.map((reward, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <reward.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{reward.title}</h2>
              <p className="text-gray-600 mb-4">{reward.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{reward.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      reward.achieved ? 'bg-green-500' : 'bg-orange-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${reward.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${
                  reward.achieved ? 'bg-green-500' : 'bg-orange-500'
                } mr-2`} />
                <span className={`text-sm font-medium ${
                  reward.achieved ? 'text-green-500' : 'text-orange-500'
                }`}>
                  {reward.achieved ? 'Achieved' : 'In Progress'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Rewards;