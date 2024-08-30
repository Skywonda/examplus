import { PrismaClient, UserType } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await argon2.hash('password');
  const lecturer = await prisma.user.create({
    data: {
      email: 'lecturer@example.com',
      password: hashedPassword,
      name: 'Dr. John Doe',
      type: UserType.LECTURER,
    },
  });

  if (!lecturer.id) return null;

  const examsData = [
    {
      title: 'Introduction to Programming',
      courseCode: 'CS101',
      description: 'Fundamentals of programming concepts',
      duration: 1800, // 30 minutes
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
      questions: [
        {
          text: 'What is the output of `console.log(2 + 2)`?',
          options: ['3', '4', '5'],
          answer: '4',
        },
        {
          text: 'Which of the following is NOT a programming language?',
          options: ['Python', 'JavaScript', 'HTML', 'C++'],
          answer: 'HTML',
        },
        {
          text: 'What is the purpose of a loop in programming?',
          options: [
            'To repeat a block of code multiple times',
            'To store data in a structured way',
            'To define a function',
            'To make decisions in the code',
          ],
          answer: 'To repeat a block of code multiple times',
        },
        {
          text: 'Which keyword is used to declare a variable in JavaScript?',
          options: ['var', 'let', 'const', 'All of the above'],
          answer: 'All of the above',
        },
        {
          text: 'What is the difference between a compiler and an interpreter?',
          options: [
            'A compiler translates code into machine code all at once, while an interpreter translates code line by line.',
            'A compiler is used for high-level languages, while an interpreter is used for low-level languages.',
            'There is no difference between a compiler and an interpreter.',
            'A compiler is faster than an interpreter.',
          ],
          answer:
            'A compiler translates code into machine code all at once, while an interpreter translates code line by line.',
        },
      ],
    },
    {
      title: 'Data Structures and Algorithms',
      courseCode: 'CS202',
      description: 'Exploring data structures and algorithms',
      duration: 3600, // 1 hour
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
      questions: [
        {
          text: 'Which data structure follows the Last-In-First-Out (LIFO) principle?',
          options: ['Queue', 'Stack', 'Linked List', 'Tree'],
          answer: 'Stack',
        },
        {
          text: 'What is the time complexity of searching for an element in a sorted array using binary search?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
          answer: 'O(log n)',
        },
        {
          text: 'Which sorting algorithm has the best average-case time complexity?',
          options: [
            'Bubble Sort',
            'Insertion Sort',
            'Merge Sort',
            'Selection Sort',
          ],
          answer: 'Merge Sort',
        },
        {
          text: 'What is the purpose of a hash table?',
          options: [
            'To store data in a hierarchical structure',
            'To efficiently store and retrieve key-value pairs',
            'To represent relationships between data',
            'To implement a queue',
          ],
          answer: 'To efficiently store and retrieve key-value pairs',
        },
        {
          text: 'What is the difference between a graph and a tree?',
          options: [
            'A graph can have cycles, while a tree cannot.',
            'A tree can have cycles, while a graph cannot.',
            'There is no difference between a graph and a tree.',
            'A graph is a type of tree.',
          ],
          answer: 'A graph can have cycles, while a tree cannot.',
        },
      ],
    },
    {
      title: 'General Knowledge Quiz',
      courseCode: 'GK101',
      description: 'Test your general knowledge',
      duration: 2700, // 45 minutes
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
      questions: [
        {
          text: 'What is the capital of France?',
          options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
          answer: 'Paris',
        },
        {
          text: 'Who painted the Mona Lisa?',
          options: [
            'Leonardo da Vinci',
            'Michelangelo',
            'Raphael',
            'Vincent van Gogh',
          ],
          answer: 'Leonardo da Vinci',
        },
        {
          text: 'What is the highest mountain in the world?',
          options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
          answer: 'Mount Everest',
        },
        {
          text: 'Which planet is known as the Red Planet?',
          options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
          answer: 'Mars',
        },
        {
          text: 'Who wrote the play "Romeo and Juliet"?',
          options: [
            'William Shakespeare',
            'Christopher Marlowe',
            'Ben Jonson',
            'John Donne',
          ],
          answer: 'William Shakespeare',
        },
      ],
    },
  ];

  for (const examData of examsData) {
    await prisma.exam.create({
      data: {
        ...examData,
        creatorId: lecturer.id,
        questions: {
          create: examData.questions.map((question) => ({
            text: question.text,
            options: question.options,
            answer: question.answer,
          })),
        },
      },
    });
  }

  console.log('Dummy data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
