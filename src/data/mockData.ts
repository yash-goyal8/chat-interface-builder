export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  group: "today" | "yesterday" | "previous7" | "previous30";
  messages: Message[];
}

const mockResponses = [
  "That's an interesting question! Let me break it down for you.\n\nHere are the key points:\n\n1. **First**, consider the fundamental principles involved\n2. **Second**, look at practical applications\n3. **Third**, think about edge cases\n\nWould you like me to elaborate on any of these points?",
  "Here's a simple example in code:\n\n```python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\n# Usage\nfor i in range(10):\n    print(fibonacci(i))\n```\n\nThis recursive approach is elegant but has exponential time complexity. For better performance, consider using dynamic programming or memoization.",
  "Great question! There are several ways to approach this:\n\n- **Option A**: Simple and straightforward, best for small projects\n- **Option B**: More scalable, requires additional setup\n- **Option C**: Enterprise-grade, with full observability\n\nI'd recommend starting with **Option A** and migrating to **Option B** as your needs grow. Let me know if you'd like more details on any of these approaches!",
];

export const getRandomMockResponse = (): string => {
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};

export const conversations: Conversation[] = [
  {
    id: "1",
    title: "Help me write a Python script",
    group: "today",
    messages: [
      { id: "1a", role: "user", content: "Can you help me write a Python script to sort a list of numbers?" },
      {
        id: "1b",
        role: "assistant",
        content:
          "Of course! Here's a simple Python script to sort a list of numbers:\n\n```python\nnumbers = [64, 34, 25, 12, 22, 11, 90]\n\n# Using built-in sort\nnumbers.sort()\nprint(\"Sorted list:\", numbers)\n\n# Using sorted() for a new list\noriginal = [64, 34, 25, 12, 22, 11, 90]\nsorted_numbers = sorted(original)\nprint(\"Original:\", original)\nprint(\"Sorted:\", sorted_numbers)\n```\n\nYou can also sort in **descending order** by passing `reverse=True`:\n\n```python\nnumbers.sort(reverse=True)\n```\n\nWould you like to see a custom sorting algorithm instead?",
      },
    ],
  },
  {
    id: "2",
    title: "Explain quantum computing",
    group: "today",
    messages: [
      { id: "2a", role: "user", content: "What is quantum computing and why is it important?" },
      {
        id: "2b",
        role: "assistant",
        content:
          "**Quantum computing** is a type of computation that harnesses quantum mechanical phenomena like **superposition** and **entanglement** to process information.\n\nHere's why it matters:\n\n1. **Speed**: Quantum computers can solve certain problems exponentially faster than classical computers\n2. **Cryptography**: They could break current encryption methods, driving the need for quantum-safe cryptography\n3. **Drug Discovery**: Simulating molecular interactions at quantum scale\n4. **Optimization**: Solving complex optimization problems in logistics, finance, and AI\n\n> \"Nature isn't classical, dammit, and if you want to make a simulation of nature, you'd better make it quantum mechanical.\" — Richard Feynman\n\nThe field is still in its early stages, but companies like IBM, Google, and startups are making rapid progress.",
      },
    ],
  },
  {
    id: "3",
    title: "Recipe for chocolate cake",
    group: "yesterday",
    messages: [
      { id: "3a", role: "user", content: "Give me a recipe for chocolate cake" },
      {
        id: "3b",
        role: "assistant",
        content:
          "# Classic Chocolate Cake 🎂\n\n## Ingredients\n- 2 cups all-purpose flour\n- 2 cups sugar\n- ¾ cup cocoa powder\n- 2 eggs\n- 1 cup milk\n- ½ cup vegetable oil\n- 2 tsp vanilla extract\n- 1 cup boiling water\n\n## Instructions\n1. Preheat oven to **350°F** (175°C)\n2. Mix dry ingredients together\n3. Add eggs, milk, oil, and vanilla; beat for 2 minutes\n4. Stir in boiling water (batter will be thin)\n5. Pour into greased pans\n6. Bake for **30-35 minutes**\n\nLet cool completely before frosting. Enjoy! 🍫",
      },
    ],
  },
  {
    id: "4",
    title: "React vs Vue comparison",
    group: "yesterday",
    messages: [
      { id: "4a", role: "user", content: "Compare React and Vue.js for me" },
      {
        id: "4b",
        role: "assistant",
        content:
          "Here's a comparison of **React** vs **Vue.js**:\n\n| Feature | React | Vue |\n|---------|-------|-----|\n| Learning Curve | Moderate | Easy |\n| Size | 42kb | 33kb |\n| Performance | Excellent | Excellent |\n| Community | Massive | Large |\n| Backed by | Meta | Community |\n\n**Choose React if:**\n- You want maximum flexibility\n- You're building a large-scale app\n- You need a huge ecosystem\n\n**Choose Vue if:**\n- You want an easier learning curve\n- You prefer convention over configuration\n- You're building small-medium apps\n\nBoth are excellent choices in 2024!",
      },
    ],
  },
  {
    id: "5",
    title: "Travel tips for Japan",
    group: "previous7",
    messages: [
      { id: "5a", role: "user", content: "What are some travel tips for visiting Japan?" },
      {
        id: "5b",
        role: "assistant",
        content:
          "# Japan Travel Tips 🇯🇵\n\n## Getting Around\n- Get a **Japan Rail Pass** for unlimited bullet train travel\n- **Suica/Pasmo** cards work on all public transit\n- Trains are incredibly punctual\n\n## Etiquette\n- **Bow** when greeting people\n- Remove shoes before entering homes and some restaurants\n- Don't tip — it's considered rude\n- Be quiet on public transport\n\n## Must-See\n- 🏯 Kyoto temples\n- 🗼 Tokyo Tower & Shibuya crossing\n- 🌸 Cherry blossoms (late March - early April)\n- 🍣 Tsukiji Fish Market\n\n## Budget Tips\n- Convenience stores (7-Eleven, Lawson) have great cheap food\n- Visit free shrines and parks\n- Stay in **capsule hotels** for a unique experience\n\nHave an amazing trip!",
      },
    ],
  },
  {
    id: "6",
    title: "How to learn machine learning",
    group: "previous7",
    messages: [
      { id: "6a", role: "user", content: "What's the best way to learn machine learning?" },
      {
        id: "6b",
        role: "assistant",
        content:
          "Here's a structured roadmap for learning **Machine Learning**:\n\n## Phase 1: Foundations (1-2 months)\n- Linear algebra & statistics basics\n- Python programming\n- NumPy & Pandas\n\n## Phase 2: Core ML (2-3 months)\n- Andrew Ng's **Machine Learning** course on Coursera\n- Scikit-learn for classical algorithms\n- Hands-on projects with real datasets\n\n## Phase 3: Deep Learning (2-3 months)\n- Neural networks fundamentals\n- **PyTorch** or TensorFlow\n- CNNs, RNNs, Transformers\n\n## Phase 4: Specialization\n- NLP, Computer Vision, or Reinforcement Learning\n- Read research papers\n- Contribute to open-source\n\n**Key tip**: Build projects at every stage. Theory without practice won't stick! 🚀",
      },
    ],
  },
];
