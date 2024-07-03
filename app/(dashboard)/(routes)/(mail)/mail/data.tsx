export const mails = [
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    name: "Tech Hub Administrator",
    email: "techhub-admin@techhub.com",
    subject: "New Featured Course Added",
    text: "Hi TechHubber,\n\nWe've just added a new featured course to our dashboard. Please review the detailed proposal attached and let us know if there are any areas you'd like to improve.\n\nThanks,\nTechHub",
    date: "2023-10-22T09:00:00",
    read: true,
    labels: ["new", "course", "free"],
  },
  {
    id: "110e8400-e29b-11d4-a716-446655440000",
    name: "Ivan Albano",
    email: "ivanalbano77@yahoo.com",
    subject: "Scheduled Maintenance Notification",
    text: "Hello TechHub Engineer,\n\nWe will be undergoing scheduled maintenance for a period of time. Please review the maintenance plan and let us know if you have any questions or concerns.\n\nThanks,\nIvan",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["maintenance", "important"],
  },
  {
    id: "7a5b72c0-12c4-11e1-840d-7b25c5ee775b",
    name: "Tech Hub Team",
    email: "support@techhub.com",
    subject: "Welcome to TechHub!",
    text: "Hi TechHubber,\n\nWelcome to TechHub! We're excited to have you on board. Explore our courses, join the community, and start your learning journey today. If you have any questions, feel free to reach out to us.\n\nBest regards,\nTech Hub Team",
    date: "2023-10-01T08:00:00",
    read: false,
    labels: ["welcome", "introduction"],
  },
  {
    id: "9a6c9b30-12c4-11e1-840d-7b25c5ee775c",
    name: "Emily Johnson",
    email: "emily.johnson@gmail.com",
    subject: "Course Feedback",
    text: "Hi there,\n\nI just finished the 'Introduction to AI' course and wanted to provide some feedback. The content was excellent, but I think adding more practical examples would be beneficial.\n\nThanks,\nEmily",
    date: "2023-10-23T14:45:00",
    read: false,
    labels: ["feedback", "course"],
  },
  {
    id: "ab5c8d40-12c4-11e1-840d-7b25c5ee775d",
    name: "John Smith",
    email: "john.smith@techhub.com",
    subject: "Billing Inquiry",
    text: "Dear TechHub Support,\n\nI have a question regarding my recent subscription payment. Can you please provide more details about the charges on my account?\n\nThank you,\nJohn",
    date: "2023-10-24T11:20:00",
    read: true,
    labels: ["billing", "inquiry"],
  },
  {
    id: "cd7e9e50-12c4-11e1-840d-7b25c5ee775e",
    name: "Sarah Connor",
    email: "sarah.connor@techhub.com",
    subject: "New Feature Request",
    text: "Hi TechHub Team,\n\nI have a suggestion for a new feature. It would be great to have a discussion forum where users can interact and share ideas.\n\nBest,\nSarah",
    date: "2023-10-25T09:30:00",
    read: false,
    labels: ["feature request", "suggestion"],
  },
];

export type Mail = (typeof mails)[number]

export const accounts = [
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Vercel</title>
        <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Alicia Koch",
    email: "alicia@gmail.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Gmail</title>
        <path
          d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Alicia Koch",
    email: "alicia@me.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>iCloud</title>
        <path
          d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

export type Account = (typeof accounts)[number]

export const contacts = [
  {
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
  },
  {
    name: "Liam Wilson",
    email: "liam.wilson@example.com",
  },
  {
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
  },
  {
    name: "Noah Martinez",
    email: "noah.martinez@example.com",
  },
  {
    name: "Ava Taylor",
    email: "ava.taylor@example.com",
  },
  {
    name: "Lucas Brown",
    email: "lucas.brown@example.com",
  },
  {
    name: "Sophia Smith",
    email: "sophia.smith@example.com",
  },
  {
    name: "Ethan Wilson",
    email: "ethan.wilson@example.com",
  },
  {
    name: "Isabella Jackson",
    email: "isabella.jackson@example.com",
  },
  {
    name: "Mia Clark",
    email: "mia.clark@example.com",
  },
  {
    name: "Mason Lee",
    email: "mason.lee@example.com",
  },
  {
    name: "Layla Harris",
    email: "layla.harris@example.com",
  },
  {
    name: "William Anderson",
    email: "william.anderson@example.com",
  },
  {
    name: "Ella White",
    email: "ella.white@example.com",
  },
  {
    name: "James Thomas",
    email: "james.thomas@example.com",
  },
  {
    name: "Harper Lewis",
    email: "harper.lewis@example.com",
  },
  {
    name: "Benjamin Moore",
    email: "benjamin.moore@example.com",
  },
  {
    name: "Aria Hall",
    email: "aria.hall@example.com",
  },
  {
    name: "Henry Turner",
    email: "henry.turner@example.com",
  },
  {
    name: "Scarlett Adams",
    email: "scarlett.adams@example.com",
  },
]

export type Contact = (typeof contacts)[number]
