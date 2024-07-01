// const { v4: uuidv4 } = require('uuid'); // Corrected import statement
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
// const userId = 'user_2iNav4E6MYoIIVZN30Jz04pQPez';

// async function main() {
//   await prisma.course.deleteMany({
//     where: {
//       userId,
//     },
//   });
//   const categories = await prisma.category.findMany();

//   const courses = await prisma.course.createMany({
//     data: [
//       {
//         id: uuidv4(),
//         userId,
//         title: 'Learn TypeScript',
//         description: 'A comprehensive course on TypeScript.',
//         imageUrl: 'https://utfs.io/f/ba6cde27-f19f-4037-9d85-fa4ea04c588c-1f4cc3.gif',
//         price: 49.99,
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         userId,
//         title: 'Master React',
//         description: 'Become a React expert with this course.',
//         imageUrl: 'https://utfs.io/f/ba6cde27-f19f-4037-9d85-fa4ea04c588c-1f4cc3.gif',
//         price: 59.99,
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         userId,
//         title: 'Introduction to GraphQL',
//         description: 'Learn the basics of GraphQL.',
//         imageUrl: 'https://utfs.io/f/ba6cde27-f19f-4037-9d85-fa4ea04c588c-1f4cc3.gif',
//         price: 39.99,
//         isPublished: false,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         userId,
//         title: 'Vue.js for Beginners',
//         description: 'A beginner-friendly course on Vue.js.',
//         imageUrl: 'https://utfs.io/f/ba6cde27-f19f-4037-9d85-fa4ea04c588c-1f4cc3.gif',
//         price: 34.99,
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         userId,
//         title: 'Svelte Basics',
//         description: 'Learn the basics of Svelte.',
//         imageUrl: 'https://utfs.io/f/ba6cde27-f19f-4037-9d85-fa4ea04c588c-1f4cc3.gif',
//         price: 29.99,
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         userId,
//         title: 'Next.js Guide',
//         description: 'A comprehensive guide to Next.js.',
//         imageUrl: 'https://utfs.io/f/ba6cde27-f19f-4037-9d85-fa4ea04c588c-1f4cc3.gif',
//         price: 39.99,
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         userId,
//         title: 'Nuxt.js for Beginners',
//         description: 'An introduction to Nuxt.js.',
//         imageUrl: 'https://utfs.io/f/ba6cde27-f19f-4037-9d85-fa4ea04c588c-1f4cc3.gif',
//         price: 34.99,
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         userId,
//         title: 'Gatsby.js Starter',
//         description: 'Get started with Gatsby.js.',
//         imageUrl: 'https://utfs.io/f/ba6cde27-f19f-4037-9d85-fa4ea04c588c-1f4cc3.gif',
//         price: 29.99,
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         userId,
//         title: 'Ember.js Essentials',
//         description: 'Essential knowledge for working with Ember.js.',
//         imageUrl: 'https://utfs.io/f/ba6cde27-f19f-4037-9d85-fa4ea04c588c-1f4cc3.gif',
//         price: 39.99,
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         userId,
//         title: 'Backbone.js Basics',
//         description: 'A foundational course on Backbone.js.',
//         imageUrl: 'https://utfs.io/f/ba6cde27-f19f-4037-9d85-fa4ea04c588c-1f4cc3.gif',
//         price: 24.99,
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         userId,
//         title: 'Meteor.js Quickstart',
//         description: 'Quickstart guide to Meteor.js.',
//         imageUrl: 'https://utfs.io/f/ba6cde27-f19f-4037-9d85-fa4ea04c588c-1f4cc3.gif',
//         price: 29.99,
//         isPublished: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ],
//   });

//   const coursesData = await prisma.course.findMany();

//   const chapters = await prisma.chapter.createMany({
//     data: [
//       {
//         id: uuidv4(),
//         title: 'Getting Started with TypeScript',
//         description: 'Introduction to TypeScript and setup.',
//         videoUrl: ' https://utfs.io/f/1047ed69-0d70-4f84-90be-da5ae9a66947-mqzdch.mp4',
//         pdfUrl: 'https://utfs.io/f/fb0778ea-b377-4959-a52c-6f8dac33e97d-2cn9d5.1.pdf',
//         position: 1,
//         isPublished: true,
//         courseId: coursesData.find(course => course.title === 'Learn TypeScript')?.id || '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         title: 'React Basics',
//         description: 'Introduction to React components and state.',
//         videoUrl: ' https://utfs.io/f/1047ed69-0d70-4f84-90be-da5ae9a66947-mqzdch.mp4',
//         pdfUrl: 'https://utfs.io/f/fb0778ea-b377-4959-a52c-6f8dac33e97d-2cn9d5.1.pdf',
//         position: 1,
//         isPublished: true,
//         courseId: coursesData.find(course => course.title === 'Master React')?.id || '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         title: 'Introduction to GraphQL',
//         description: 'Learn the basics of GraphQL.',
//         videoUrl: ' https://utfs.io/f/1047ed69-0d70-4f84-90be-da5ae9a66947-mqzdch.mp4',
//         pdfUrl: 'https://utfs.io/f/fb0778ea-b377-4959-a52c-6f8dac33e97d-2cn9d5.1.pdf',
//         position: 1,
//         isPublished: false,
//         courseId: coursesData.find(course => course.title === 'Introduction to GraphQL')?.id || '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         title: 'Vue.js Basics',
//         description: 'Introduction to Vue.js fundamentals.',
//         videoUrl: 'https://utfs.io/f/1047ed69-0d70-4f84-90be-da5ae9a66947-mqzdch.mp4',
//         pdfUrl: 'https://utfs.io/f/fb0778ea-b377-4959-a52c-6f8dac33e97d-2cn9d5.1.pdf',
//         position: 1,
//         isPublished: true,
//         courseId: coursesData.find(course => course.title === 'Vue.js for Beginners')?.id || '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         title: 'Introduction to Svelte',
//         description: 'Learn the basics of Svelte.',
//         videoUrl: ' https://utfs.io/f/1047ed69-0d70-4f84-90be-da5ae9a66947-mqzdch.mp4',
//         pdfUrl: 'https://utfs.io/f/fb0778ea-b377-4959-a52c-6f8dac33e97d-2cn9d5.1.pdf',
//         position: 1,
//         isPublished: true,
//         courseId: coursesData.find(course => course.title === 'Svelte Basics')?.id || '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         title: 'Next.js Basics',
//         description: 'Introduction to Next.js.',
//         videoUrl: ' https://utfs.io/f/1047ed69-0d70-4f84-90be-da5ae9a66947-mqzdch.mp4',
//         pdfUrl: 'https://utfs.io/f/fb0778ea-b377-4959-a52c-6f8dac33e97d-2cn9d5.1.pdf',
//         position: 1,
//         isPublished: true,
//         courseId: coursesData.find(course => course.title === 'Next.js Guide')?.id || '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         title: 'Nuxt.js Basics',
//         description: 'Introduction to Nuxt.js fundamentals.',
//         videoUrl: ' https://utfs.io/f/1047ed69-0d70-4f84-90be-da5ae9a66947-mqzdch.mp4',
//         pdfUrl: 'https://utfs.io/f/fb0778ea-b377-4959-a52c-6f8dac33e97d-2cn9d5.1.pdf',
//         position: 1,
//         isPublished: true,
//         courseId: coursesData.find(course => course.title === 'Nuxt.js for Beginners')?.id || '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         title: 'Gatsby.js Basics',
//         description: 'Introduction to Gatsby.js.',
//         videoUrl: ' https://utfs.io/f/1047ed69-0d70-4f84-90be-da5ae9a66947-mqzdch.mp4',
//         pdfUrl: 'https://utfs.io/f/fb0778ea-b377-4959-a52c-6f8dac33e97d-2cn9d5.1.pdf',
//         position: 1,
//         isPublished: true,
//         courseId: coursesData.find(course => course.title === 'Gatsby.js Starter')?.id || '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         title: 'Ember.js Basics',
//         description: 'Introduction to Ember.js fundamentals.',
//         videoUrl: ' https://utfs.io/f/1047ed69-0d70-4f84-90be-da5ae9a66947-mqzdch.mp4',
//         pdfUrl: 'https://utfs.io/f/fb0778ea-b377-4959-a52c-6f8dac33e97d-2cn9d5.1.pdf',
//         position: 1,
//         isPublished: true,
//         courseId: coursesData.find(course => course.title === 'Ember.js Essentials')?.id || '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         title: 'Backbone.js Basics',
//         description: 'Introduction to Backbone.js.',
//         videoUrl: ' https://utfs.io/f/1047ed69-0d70-4f84-90be-da5ae9a66947-mqzdch.mp4',
//         pdfUrl: 'https://utfs.io/f/fb0778ea-b377-4959-a52c-6f8dac33e97d-2cn9d5.1.pdf',
//         position: 1,
//         isPublished: true,
//         courseId: coursesData.find(course => course.title === 'Backbone.js Basics')?.id || '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: uuidv4(),
//         title: 'Meteor.js Basics',
//         description: 'Introduction to Meteor.js fundamentals.',
//         videoUrl: ' https://utfs.io/f/1047ed69-0d70-4f84-90be-da5ae9a66947-mqzdch.mp4',
//         pdfUrl: 'https://utfs.io/f/fb0778ea-b377-4959-a52c-6f8dac33e97d-2cn9d5.1.pdf',
//         position: 1,
//         isPublished: true,
//         courseId: coursesData.find(course => course.title === 'Meteor.js Quickstart')?.id || '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ],
//   });

//   // Associating courses with categories
//   await prisma.course.update({
//     where: { title: 'Learn TypeScript' },
//     data: {
//       categories: {
//         connect: [{ name: 'Angular' }],
//       },
//     },
//   });

//   await prisma.course.update({
//     where: { title: 'Master React' },
//     data: {
//       categories: {
//         connect: [{ name: 'React' }],
//       },
//     },
//   });

//   await prisma.course.update({
//     where: { title: 'Introduction to GraphQL' },
//     data: {
//       categories: {
//         connect: [{ name: 'Meteor' }],
//       },
//     },
//   });

//   await prisma.course.update({
//     where: { title: 'Vue.js for Beginners' },
//     data: {
//       categories: {
//         connect: [{ name: 'Vue' }],
//       },
//     },
//   });

//   await prisma.course.update({
//     where: { title: 'Svelte Basics' },
//     data: {
//       categories: {
//         connect: [{ name: 'Svelte' }],
//       },
//     },
//   });

//   await prisma.course.update({
//     where: { title: 'Next.js Guide' },
//     data: {
//       categories: {
//         connect: [{ name: 'Next.js' }],
//       },
//     },
//   });

//   await prisma.course.update({
//     where: { title: 'Nuxt.js for Beginners' },
//     data: {
//       categories: {
//         connect: [{ name: 'Nuxt.js' }],
//       },
//     },
//   });

//   await prisma.course.update({
//     where: { title: 'Gatsby.js Starter' },
//     data: {
//       categories: {
//         connect: [{ name: 'Gatsby' }],
//       },
//     },
//   });

//   await prisma.course.update({
//     where: { title: 'Ember.js Essentials' },
//     data: {
//       categories: {
//         connect: [{ name: 'Ember.js' }],
//       },
//     },
//   });

//   await prisma.course.update({
//     where: { title: 'Backbone.js Basics' },
//     data: {
//       categories: {
//         connect: [{ name: 'Backbone.js' }],
//       },
//     },
//   });

//   await prisma.course.update({
//     where: { title: 'Meteor.js Quickstart' },
//     data: {
//       categories: {
//         connect: [{ name: 'Meteor' }],
//       },
//     },
//   });

//   console.log({ categories, courses, chapters });
// }

// main()
//   .catch(e => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// async function main() {
//     await prisma.Category.createMany({
//         data: [
//             { name: 'React' },
//             { name: 'Angular' },
//             { name: 'Vue' },
//             { name: 'Svelte' },
//             { name: 'Next.js' },
//             { name: 'Nuxt.js' },
//             { name: 'Gatsby' },
//             { name: 'Ember.js' },
//             { name: 'Backbone.js' },
//             { name: 'Meteor' },
//             // Add more categories as needed
//         ],
//     });
//     console.log('Seeding complete');
// }

// main()
//     .catch(e => {
//         console.error(e);
//         process.exit(1);
//     })