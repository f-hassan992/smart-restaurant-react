// Simulated AI dataset from the project brief. The keywords decide which answer matches.
export const chatbotData = [
  {
    id: 'specials',
    question: "What are today's specials?",
    keywords: ['special', 'today'],
    response: "Today's special is Chicken Alfredo for $18.99.",
  },
  {
    id: 'vegetarian',
    question: 'What vegetarian meals do you have?',
    keywords: ['vegetarian', 'veggie'],
    response:
      'We offer Vegetable Pasta, Margherita Pizza, and Garden Salad.',
  },
  {
    id: 'recommend',
    question: 'What do you recommend?',
    keywords: ['recommend', 'suggest', 'best'],
    response: 'Based on popular orders, we recommend our Chicken Alfredo.',
  },
  {
    id: 'gluten-free',
    question: 'Do you have gluten-free options?',
    keywords: ['gluten'],
    response: 'Yes. We offer gluten-free pasta and selected salads.',
  },
  {
    id: 'popular-dessert',
    question: 'What is the most popular dessert?',
    keywords: ['dessert', 'sweet'],
    response: 'Our Chocolate Lava Cake is our most popular dessert.',
  },
   {
    id: 'last-order',
    question: 'What did I order last time?',
    keywords: ['last time', 'previous order', 'last order', 'did i order'],
    // Used when the customer has no orders yet. With real orders,
    // getBotReply.js replaces it with the customer's actual last order.
    response: "You haven’t placed an order yet.",
  },
];

// The buttons under the chat window are made from the questions above.
export const suggestedQuestions = chatbotData.map((entry) => entry.question);

export const greeting =
  "Hi! I'm the restaurant assistant. Ask me about today's specials, vegetarian or gluten-free options, desserts, recommendations, or your last order.";

export const fallbackReply =
  "Sorry, I didn't understand that. Try asking about today's specials, vegetarian or gluten-free options, desserts, recommendations, or your last order.";