export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  /** Scaffolding hint shown when the learner answers incorrectly */
  scaffold: string;
}

export type SkillGateLevel = "literal" | "inferential" | "critical";

export interface SkillGateSection {
  level: SkillGateLevel;
  label: string;
  description: string;
  questions: QuizQuestion[];
}

export interface TranscriptSegment {
  text: string;
  status: "correct" | "mispronounced";
}

export interface ActivityContent {
  moduleId: string;
  title: string;
  language: "English" | "Filipino";
  difficulty: "Easy" | "Medium" | "Hard";
  estMinutes: number;
  xpReward: number;
  readingLevel: string;
  questionCount: number;
  passage: string;
  readAloudExcerpt: string;
  readingTips: string[];
  transcript: {
    oralAccuracy: number;
    wordsCorrect: number;
    wordsTotal: number;
    pronunciationAccuracy: number;
    readingFluency: number;
    paceScore: number;
    segments: TranscriptSegment[];
  };
  skillGate: SkillGateSection[];
}

export const activities: Record<string, ActivityContent> = {
  "great-coral-reef": {
    moduleId: "great-coral-reef",
    title: "The Great Coral Reef",
    language: "English",
    difficulty: "Medium",
    estMinutes: 15,
    xpReward: 50,
    readingLevel: "Instructional",
    questionCount: 9,
    passage: `The Great Barrier Reef is the world's largest coral reef system, stretching over 2,300 kilometers along the northeastern coast of Australia. It is home to thousands of species of marine life, including colorful fish, sea turtles, and dolphins. Coral reefs are sometimes called the "rainforests of the sea" because of their incredible biodiversity. Scientists warn that rising ocean temperatures due to climate change are causing coral bleaching — a phenomenon where corals lose their vibrant colors and become vulnerable to disease. Protecting the Great Barrier Reef requires global cooperation to reduce greenhouse gas emissions and limit local threats such as pollution and overfishing. Many marine biologists dedicate their lives to studying and preserving these underwater ecosystems for future generations.`,
    readAloudExcerpt: `The Great Barrier Reef is the world's largest coral reef system, stretching over 2,300 kilometers along the northeastern coast of Australia. It is home to thousands of species of marine life, including colorful fish, sea turtles, and dolphins. Coral reefs`,
    readingTips: [
      "Read at a natural, comfortable pace.",
      "Speak clearly and loudly enough for the mic.",
      "Pause briefly at commas and periods.",
      "Enunciate each syllable in longer words.",
      "You can re-record before proceeding.",
    ],
    transcript: {
      oralAccuracy: 90,
      wordsCorrect: 36,
      wordsTotal: 40,
      pronunciationAccuracy: 90,
      readingFluency: 95,
      paceScore: 82,
      segments: [
        { text: "The Great Barrier Reef ", status: "correct" },
        { text: "is", status: "mispronounced" },
        { text: " the world's largest coral reef system, ", status: "correct" },
        { text: "stretching", status: "mispronounced" },
        { text: " over 2,300 kilometers along the northeastern coast ", status: "correct" },
        { text: "of", status: "mispronounced" },
        { text: " Australia. It is home to thousands of species ", status: "correct" },
        { text: "of", status: "mispronounced" },
        { text: " marine life, including colorful fish, sea turtles, and dolphins. Coral reefs", status: "correct" },
      ],
    },
    skillGate: [
      {
        level: "literal",
        label: "Literal",
        description: "Answer directly from the passage — what does the text explicitly say?",
        questions: [
          {
            id: "gcr-l1",
            prompt: "Where is the Great Barrier Reef located?",
            options: ["Atlantic Ocean", "Northeastern coast of Australia", "Pacific Islands", "Indian Ocean"],
            correctIndex: 1,
            scaffold: "Look at the second sentence of the passage — it names the coast directly.",
          },
          {
            id: "gcr-l2",
            prompt: "What is another name for coral reefs mentioned in the passage?",
            options: ["Blue forests of the sea", "Rainforests of the sea", "Gardens of the ocean", "Rivers of the deep"],
            correctIndex: 1,
            scaffold: "The passage compares coral reefs to a very biodiverse land habitat.",
          },
          {
            id: "gcr-l3",
            prompt: "According to the passage, what is coral bleaching?",
            options: [
              "Corals growing faster than normal",
              "Corals losing their color and becoming vulnerable to disease",
              "Corals changing location in the ocean",
              "Corals producing new marine species",
            ],
            correctIndex: 1,
            scaffold: "Re-read the sentence that starts with 'Scientists warn...'",
          },
        ],
      },
      {
        level: "inferential",
        label: "Inferential",
        description: "Read between the lines — what does the text imply but not say directly?",
        questions: [
          {
            id: "gcr-i1",
            prompt: "Why do scientists say coral bleaching is dangerous for reefs?",
            options: [
              "Because it makes reefs more colorful",
              "Because it makes corals more vulnerable to disease",
              "Because it attracts more tourists",
              "Because it happens only once a year",
            ],
            correctIndex: 1,
            scaffold: "Think about what happens to corals after they lose their vibrant color.",
          },
          {
            id: "gcr-i2",
            prompt: "What can you infer about the reef's importance to marine life?",
            options: [
              "It has little effect on marine species",
              "It provides a habitat for thousands of species",
              "Marine animals avoid the reef",
              "Only fish live near the reef",
            ],
            correctIndex: 1,
            scaffold: "Consider how many different animals the passage says live there.",
          },
          {
            id: "gcr-i3",
            prompt: "What might happen if greenhouse gas emissions are not reduced?",
            options: [
              "The reef would likely face less bleaching",
              "The reef would likely face more bleaching and damage",
              "The reef would move to another ocean",
              "Nothing would change for the reef",
            ],
            correctIndex: 1,
            scaffold: "The passage links rising ocean temperatures to coral bleaching — what causes that rise?",
          },
        ],
      },
      {
        level: "critical",
        label: "Critical",
        description: "Evaluate and reflect — form an opinion or judge the ideas in the text.",
        questions: [
          {
            id: "gcr-c1",
            prompt: "What is most likely the author's purpose in writing this passage?",
            options: [
              "To sell tickets to visit Australia",
              "To raise awareness about protecting the reef",
              "To describe a fictional underwater story",
              "To advertise diving equipment",
            ],
            correctIndex: 1,
            scaffold: "Notice how the passage ends — what does it call on readers/nations to do?",
          },
          {
            id: "gcr-c2",
            prompt: "Which idea best reflects the passage's argument about protecting the reef?",
            options: [
              "Only marine biologists are responsible for the reef",
              "Protecting the reef requires global cooperation",
              "The reef does not need protection",
              "Only Australia is affected by reef damage",
            ],
            correctIndex: 1,
            scaffold: "Look at the sentence that begins with 'Protecting the Great Barrier Reef requires...'",
          },
          {
            id: "gcr-c3",
            prompt: "Do you think everyday choices, like reducing pollution, could help the reef? Why?",
            options: [
              "No, individual actions never make a difference",
              "Yes, because the passage links local threats like pollution to reef damage",
              "No, only scientists can help the reef",
              "Yes, but only if you live in Australia",
            ],
            correctIndex: 1,
            scaffold: "The passage names pollution and overfishing as local threats alongside the global one.",
          },
        ],
      },
    ],
  },

  "bayani-ng-bayan": {
    moduleId: "bayani-ng-bayan",
    title: "Ang Bayani ng Bayan",
    language: "Filipino",
    difficulty: "Easy",
    estMinutes: 10,
    xpReward: 30,
    readingLevel: "Instructional",
    questionCount: 6,
    passage: `Si Kapitan Andres ang matagal nang kapitan ng barangay sa tabing-ilog. Isang gabi, biglang lumakas ang ulan at unti-unting tumaas ang tubig-baha. Nagising siya sa ingay ng mga kapitbahay na humihingi ng tulong. Nang hindi na siya nag-atubili, kumuha siya ng bangka at tinulungan ang mga pamilya, lalo na ang mga bata at matatanda, na lumikas patungo sa evacuation center. Buong gabi siyang gumawa ng ilang biyahe kahit pagod na pagod na siya. Kinaumagahan, humupa na ang baha at ligtas ang lahat ng residente. Sinabi ng mga taganayon na si Kapitan Andres ang tunay na bayani ng kanilang barangay.`,
    readAloudExcerpt: `Si Kapitan Andres ang matagal nang kapitan ng barangay sa tabing-ilog. Isang gabi, biglang lumakas ang ulan at unti-unting tumaas ang tubig-baha. Nagising siya sa ingay ng mga kapitbahay na humihingi ng tulong.`,
    readingTips: [
      "Read at a natural, comfortable pace.",
      "Speak clearly and loudly enough for the mic.",
      "Pause briefly at commas and periods.",
      "Enunciate each syllable in longer words.",
      "You can re-record before proceeding.",
    ],
    transcript: {
      oralAccuracy: 88,
      wordsCorrect: 22,
      wordsTotal: 25,
      pronunciationAccuracy: 88,
      readingFluency: 90,
      paceScore: 85,
      segments: [
        { text: "Si Kapitan Andres ang matagal nang kapitan ng ", status: "correct" },
        { text: "barangay", status: "mispronounced" },
        { text: " sa tabing-ilog. Isang gabi, biglang lumakas ang ulan at ", status: "correct" },
        { text: "unti-unting", status: "mispronounced" },
        { text: " tumaas ang tubig-baha.", status: "correct" },
      ],
    },
    skillGate: [
      {
        level: "literal",
        label: "Literal",
        description: "Sagutin batay sa direktang nakasulat sa teksto.",
        questions: [
          {
            id: "bnb-l1",
            prompt: "Sino ang kapitan ng barangay sa kuwento?",
            options: ["Kapitan Andres", "Kapitan Mateo", "Kapitan Ramon", "Kapitan Isko"],
            correctIndex: 0,
            scaffold: "Nasa unang pangungusap ng kuwento ang pangalan ng kapitan.",
          },
          {
            id: "bnb-l2",
            prompt: "Ano ang ginamit ni Kapitan Andres para tulungan ang mga residente?",
            options: ["Trak", "Bangka", "Bisikleta", "Eroplano"],
            correctIndex: 1,
            scaffold: "Isipin kung ano ang pinakamadaling paraan para tumawid sa baha.",
          },
        ],
      },
      {
        level: "inferential",
        label: "Inferential",
        description: "Unawain ang ideyang hindi direktang nasabi sa teksto.",
        questions: [
          {
            id: "bnb-i1",
            prompt: "Bakit tinawag na bayani si Kapitan Andres?",
            options: [
              "Dahil siya ang pinakamayaman sa barangay",
              "Dahil tinulungan niya ang mga residente kahit mapanganib",
              "Dahil siya ang may-ari ng bangka",
              "Dahil siya ang pinakamatanda sa barangay",
            ],
            correctIndex: 1,
            scaffold: "Alalahanin kung ano ang ginawa niya buong gabi kahit pagod na siya.",
          },
        ],
      },
      {
        level: "critical",
        label: "Critical",
        description: "Magbigay ng sariling pananaw o paghatol tungkol sa teksto.",
        questions: [
          {
            id: "bnb-c1",
            prompt: "Anong katangian ni Kapitan Andres ang pinakadapat tularan?",
            options: ["Kayamanan", "Katapangan at pagmamalasakit", "Kasikatan", "Katalinuhan sa negosyo"],
            correctIndex: 1,
            scaffold: "Tingnan kung anong uri ng tao siya batay sa kanyang mga ginawa, hindi sa kanyang ari-arian.",
          },
        ],
      },
    ],
  },
};

export function getActivity(moduleId: string): ActivityContent | undefined {
  return activities[moduleId];
}