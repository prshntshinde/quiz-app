import mongoose from "mongoose";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(__dirname, "../.env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex > 0) {
        const key = trimmed.slice(0, eqIndex).trim();
        let value = trimmed.slice(eqIndex + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    }
  }
} catch {
  console.error("Could not read .env.local");
  process.exit(1);
}

const questions: Array<{
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: number;
  explanation: string;
}> = [
  {
    question: "What is the capital of Australia?",
    option1: "Sydney",
    option2: "Melbourne",
    option3: "Canberra",
    option4: "Brisbane",
    answer: 2,
    explanation:
      "Canberra is the capital city of Australia, chosen as a compromise between Sydney and Melbourne.",
  },
  {
    question: "What is the chemical symbol for gold?",
    option1: "Go",
    option2: "Gd",
    option3: "Au",
    option4: "Ag",
    answer: 2,
    explanation:
      "Au is the chemical symbol for gold, derived from the Latin word 'aurum' meaning gold.",
  },
  {
    question: "In which year did World War II end?",
    option1: "1943",
    option2: "1944",
    option3: "1945",
    option4: "1946",
    answer: 2,
    explanation:
      "World War II ended in 1945 after the surrender of Germany in May and Japan in September.",
  },
  {
    question: "Which planet is known as the Red Planet?",
    option1: "Venus",
    option2: "Mars",
    option3: "Jupiter",
    option4: "Saturn",
    answer: 1,
    explanation:
      "Mars is called the Red Planet because of its reddish appearance due to iron oxide (rust) on its surface.",
  },
  {
    question: "What is the largest organ in the human body?",
    option1: "Liver",
    option2: "Brain",
    option3: "Heart",
    option4: "Skin",
    answer: 3,
    explanation:
      "The skin is the largest organ of the human body, covering an average area of about 1.5 to 2 square meters.",
  },
  {
    question: 'In which sport would you perform a "slam dunk"?',
    option1: "Volleyball",
    option2: "Tennis",
    option3: "Basketball",
    option4: "Soccer",
    answer: 2,
    explanation:
      "A slam dunk is a type of basketball shot performed by jumping and pushing the ball through the hoop with one or both hands.",
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    option1: "Charles Dickens",
    option2: "William Shakespeare",
    option3: "Jane Austen",
    option4: "Mark Twain",
    answer: 1,
    explanation:
      "William Shakespeare wrote Romeo and Juliet, one of his most famous tragedies, around 1597.",
  },
  {
    question: "What does HTTP stand for?",
    option1: "HyperText Transfer Protocol",
    option2: "High Transfer Text Protocol",
    option3: "HyperText Transmission Process",
    option4: "High Tech Transfer Protocol",
    answer: 0,
    explanation:
      "HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the World Wide Web.",
  },
  {
    question: "What is the longest river in the world?",
    option1: "Amazon",
    option2: "Nile",
    option3: "Mississippi",
    option4: "Yangtze",
    answer: 1,
    explanation:
      "The Nile River is generally considered the longest river in the world, stretching about 6,650 kilometers through Africa.",
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    option1: "Oxygen",
    option2: "Nitrogen",
    option3: "Carbon Dioxide",
    option4: "Hydrogen",
    answer: 2,
    explanation:
      "Plants absorb carbon dioxide from the atmosphere during photosynthesis to produce glucose and oxygen.",
  },
  {
    question: "How many continents are there on Earth?",
    option1: "5",
    option2: "6",
    option3: "7",
    option4: "8",
    answer: 2,
    explanation:
      "There are seven continents: Africa, Antarctica, Asia, Australia, Europe, North America, and South America.",
  },
  {
    question: "What is the approximate speed of light?",
    option1: "300,000 km/s",
    option2: "150,000 km/s",
    option3: "500,000 km/s",
    option4: "1,000,000 km/s",
    answer: 0,
    explanation:
      "Light travels at approximately 300,000 kilometers per second (299,792,458 m/s) in a vacuum.",
  },
  {
    question: "Who was the first President of the United States?",
    option1: "Thomas Jefferson",
    option2: "George Washington",
    option3: "Abraham Lincoln",
    option4: "John Adams",
    answer: 1,
    explanation:
      "George Washington served as the first President of the United States from 1789 to 1797.",
  },
  {
    question: 'Which movie features a character named "Forrest Gump"?',
    option1: "Cast Away",
    option2: "The Green Mile",
    option3: "Forrest Gump",
    option4: "Philadelphia",
    answer: 2,
    explanation:
      "Forrest Gump (1994) stars Tom Hanks as Forrest Gump and won the Academy Award for Best Picture.",
  },
  {
    question: "What is the value of Pi (π) to two decimal places?",
    option1: "3.14",
    option2: "3.16",
    option3: "3.12",
    option4: "3.18",
    answer: 0,
    explanation:
      "Pi (π) is approximately 3.14159, so to two decimal places it is 3.14.",
  },
  {
    question: "What is the chemical formula for water?",
    option1: "CO2",
    option2: "H2O",
    option3: "NaCl",
    option4: "O2",
    answer: 1,
    explanation:
      "Water has the chemical formula H2O, meaning two hydrogen atoms bonded to one oxygen atom.",
  },
  {
    question: "Which is the largest desert in the world?",
    option1: "Sahara",
    option2: "Gobi",
    option3: "Arabian",
    option4: "Antarctic",
    answer: 3,
    explanation:
      "The Antarctic Desert is the largest desert in the world, covering about 14.2 million square kilometers.",
  },
  {
    question: "How many players are on a standard soccer team?",
    option1: "9",
    option2: "10",
    option3: "11",
    option4: "12",
    answer: 2,
    explanation:
      "A standard soccer team has 11 players on the field: one goalkeeper and ten outfield players.",
  },
  {
    question: 'Which band performed "Bohemian Rhapsody"?',
    option1: "The Beatles",
    option2: "Queen",
    option3: "Led Zeppelin",
    option4: "Pink Floyd",
    answer: 1,
    explanation:
      "Queen performed Bohemian Rhapsody, released in 1975 on their album 'A Night at the Opera'.",
  },
  {
    question: "How long does it take for Earth to orbit the Sun?",
    option1: "300 days",
    option2: "365 days",
    option3: "400 days",
    option4: "450 days",
    answer: 1,
    explanation:
      "Earth takes approximately 365.25 days to complete one orbit around the Sun, which is why we have a leap year every four years.",
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found in .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db!;
    const quizzesCollection = db.collection("quizzes");
    const questionsCollection = db.collection("questions");

    const quiz = await quizzesCollection.findOne({ title: "Pras" });
    if (!quiz) {
      console.error('Quiz titled "Pras" not found');
      const allQuizzes = await quizzesCollection.find({}).toArray();
      for (const q of allQuizzes) {
        console.log(`  Available: "${q.title}" (${q._id})`);
      }
      process.exit(1);
    }

    console.log(`Found quiz: "${quiz.title}" (${quiz._id})`);

    const lastQuestion = await questionsCollection
      .findOne({ quiz_id: quiz._id }, { sort: { question_id: -1 }, projection: { question_id: 1 } });
    const startId = lastQuestion ? lastQuestion.question_id + 1 : 1;

    const docs = questions.map((q, i) => ({
      question: q.question,
      optionA: q.option1,
      optionB: q.option2,
      optionC: q.option3,
      optionD: q.option4,
      answer: q.answer,
      explanation: q.explanation,
      quiz_id: quiz._id,
      question_id: startId + i,
      isUsed: false,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const result = await questionsCollection.insertMany(docs, { ordered: true });
    console.log(
      `Successfully inserted ${Object.keys(result.insertedIds).length} questions (IDs ${startId}–${startId + docs.length - 1}) into "${quiz.title}"`
    );
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
