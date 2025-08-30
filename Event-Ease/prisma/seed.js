import prisma from "../src/utils/prismaClient.js";

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      name: "Alice Tester",
      email: "alice@example.com",
      password: "password123", // hash later in real app
      role: "USER",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob Admin",
      email: "bob@example.com",
      password: "adminpass",
      role: "ADMIN",
    },
  });

  // Create events for Alice
  await prisma.event.createMany({
    data: [
      {
        title: "React Workshop",
        description: "Learn React basics in 2 hours",
        date: new Date("2025-09-10"),
        userId: user1.id,
      },
      {
        title: "Database 101",
        description: "Intro to SQL and databases",
        date: new Date("2025-09-15"),
        userId: user1.id,
      },
    ],
  });

  // Create events for Bob
  await prisma.event.create({
    data: {
      title: "Admin Conference",
      description: "Event management strategies",
      date: new Date("2025-09-20"),
      userId: user2.id,
    },
  });
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
