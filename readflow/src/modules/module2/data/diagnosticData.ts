export interface DiagnosticChoice {
  id: string;
  label: string;
}

export interface DiagnosticQuestion {
  id: string;
  prompt: string;
  choices: readonly DiagnosticChoice[];
  correctChoiceId: string;
}

export const diagnosticPassage = {
  title: "The Lost Kite",
  paragraphs: [
    "Mia went to the park with her red kite. The wind was strong, and the kite flew high in the sky. Mia smiled as she held the string tightly.",
    "Suddenly, the string slipped from her hand. The kite flew over the trees and disappeared.",
    "Mia looked around and saw a boy holding the red kite near the playground. He gave it back to her, and Mia thanked him. She held the string more carefully and continued flying her kite.",
  ],
} as const;

export const diagnosticQuestions: readonly DiagnosticQuestion[] = [
  {
    id: "kite-color",
    prompt: "What color was Mia's kite?",
    choices: [
      { id: "blue", label: "Blue" },
      { id: "green", label: "Green" },
      { id: "red", label: "Red" },
      { id: "yellow", label: "Yellow" },
    ],
    correctChoiceId: "red",
  },
  {
    id: "kite-place",
    prompt: "Where did Mia fly her kite?",
    choices: [
      { id: "beach", label: "At the beach" },
      { id: "park", label: "At the park" },
      { id: "school", label: "At school" },
      { id: "yard", label: "In her yard" },
    ],
    correctChoiceId: "park",
  },
  {
    id: "kite-lost",
    prompt: "Why did the kite fly away?",
    choices: [
      { id: "broke", label: "The kite broke" },
      { id: "rain", label: "It started to rain" },
      { id: "slipped", label: "The string slipped from Mia's hand" },
      { id: "gave-away", label: "Mia gave it to someone" },
    ],
    correctChoiceId: "slipped",
  },
  {
    id: "kite-returned",
    prompt: "Who returned the kite to Mia?",
    choices: [
      { id: "boy", label: "A boy near the playground" },
      { id: "teacher", label: "Her teacher" },
      { id: "mother", label: "Her mother" },
      { id: "friend", label: "Her best friend" },
    ],
    correctChoiceId: "boy",
  },
  {
    id: "kite-after",
    prompt: "What did Mia do after she got her kite back?",
    choices: [
      { id: "home", label: "She went straight home" },
      { id: "gift", label: "She gave the kite to the boy" },
      { id: "tree", label: "She climbed a tree" },
      { id: "careful", label: "She held the string more carefully" },
    ],
    correctChoiceId: "careful",
  },
];
