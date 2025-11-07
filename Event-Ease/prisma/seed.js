import prisma from "../src/utils/prismaClient.js";

async function main() {
  // Create sample users
  // const user1 = await prisma.user.create({
  //   data: {
  //     name: "Alice Tester",
  //     email: "alice@example.com",
  //     password: "password123", // hash later in real app
  //     role: "USER",
  //   },
  // });

  // const user2 = await prisma.user.create({
  //   data: {
  //     name: "Bob Admin",
  //     email: "bob@example.com",
  //     password: "adminpass",
  //     role: "ADMIN",
  //   },
  // });

  // const newUsers = [];

  // for (let i = 3; i < 7; i++) {
  //   const user = await prisma.user.create({
  //     data: {
  //       name: `user${i}`,
  //       email: `emailntu${i}@gmail.com`,
  //       password: "test1234",
  //       role: "ORGANIZER",
  //     },
  //   });
  //   newUsers.push(user);
  // }

  // const allUsers = [user1, user2, ...newUsers];

  // // Create events for Alice
  // await prisma.event.createMany({
  //   data: [
  //     {
  //       title: "React Workshop",
  //       description: "Learn React basics in 2 hours",
  //       date: new Date("2025-09-10"),
  //       location: "Pune",
  //       bannerImage: null,
  //       type: "Global",
  //       userId: user1.id,
  //     },
  //     {
  //       title: "Database 101",
  //       description: "Intro to SQL and databases",
  //       date: new Date("2025-09-15"),
  //       location: "Noida",
  //       bannerImage: null,
  //       type: "Private",
  //       userId: user1.id,
  //     },
  //   ],
  // });

  // // Create events for Bob
  // await prisma.event.create({
  //   data: {
  //     title: "Admin Conference",
  //     description: "Event management strategies",
  //     date: new Date("2025-09-20"),
  //     location: "Goa",
  //     bannerImage: null,
  //     type: "Private",
  //     userId: user2.id,
  //   },
  // });

  // for (const user of allUsers) {
  const events = [];

  for (let i = 0; i < 25; i++) {
    events.push({
      title: `Event ${i} by Rohan`,
      description: `This is event number ${i} created by Rohan`,
      date: new Date(
        2026,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ),
      location: ["Pune", "Delhi", "Mumbai", "Meerut", "Noida", "Bangalore"][
        Math.floor(Math.random() * 6)
      ],
      bannerImage: null,
      type: ["Global", "Private"][Math.floor(Math.random() * 2)],
      userId: 7,
    });
  }
  await prisma.event.createMany({ data: events });
  console.log("25 events created for user -> Rohan");
  // }
}

main()
  .then(() => console.log("🌱 Database seeded successfully"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
