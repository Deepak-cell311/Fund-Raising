import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How do I start fundraising?",
    answer: "Starting is easy! Simply create your profile, set up your campaign with a clear goal, and share it with your network."
  },
  {
    question: "What percentage of donations goes to the cause?",
    answer: "100% of your donations go directly to supporting NayePankh Foundation's initiatives for children's welfare."
  },
  {
    question: "How can I withdraw the funds?",
    answer: "Funds are automatically transferred to NayePankh Foundation and used for various children's welfare programs."
  },
  {
    question: "Can I create multiple fundraising campaigns?",
    answer: "Yes, you can create multiple campaigns for different causes or events within NayePankh Foundation's mission."
  },
  {
    question: "How do I share my campaign?",
    answer: "You can share your campaign through various social media platforms, WhatsApp, or by copying and sharing your unique campaign link."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900" style={{scrollbarWidth: "none"}}>Frequently Asked Questions</h1>
        <p className="mt-2 text-gray-600">Find answers to common questions about fundraising with NayePankh Foundation</p>
      </header>

      <div className="space-y-4" style={{scrollbarWidth: "none"}}>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="px-6 py-4 bg-gray-50"
                  style={{scrollbarWidth: "none"}}
                >
                  <p className="text-gray-600" >{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;