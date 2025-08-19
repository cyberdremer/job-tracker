import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

const restDatabase = async () => {
  try {
    await Promise.all([
      prisma.user.deleteMany(),
      prisma.jobEntry.deleteMany(),
      prisma.session.deleteMany(),
    ]);

    console.log("Tables reset successfully");
  } catch (error) {
    console.error("Error dropping the database:", error);
  } finally {
    console.log("Exiting drop script");
  }
};

const seedDatabase = async () => {
  try {
    const user = await prisma.user.create({
      data: {
        fullname: "Jane Doe",
        email: "janedoe1234@gmail.com",
        passwordhash: await bcrypt.hash("123456789", 16),
      },
    });
    await prisma.jobEntry.createMany({
      data: [
        {
          ownerid: user.id,
          title: "Software Engineer",
          salary: "100000",
          location: "New York, NY",
          link: "",
          status: "APPLIED",
          company: "Tech Corp",
          dateapplied: new Date("2025-01-15"),
          description: "",
        },
        {
          ownerid: user.id,
          title: "Data Scientist",
          salary: "120000",
          location: "San Francisco, CA",
          link: "",
          status: "INTERVIEWING",
          company: "Data Solutions Inc.",
          dateapplied: new Date("2025-02-20"),
          description: "",
        },
        {
          ownerid: user.id,
          title: "Product Manager",
          salary: "130000",
          location: "Austin, TX",
          status: "ACCEPTED",
          company: "Innovatech",
          link: "",
          dateapplied: new Date("2025-03-10"),
          description: "",
        },
        {
          ownerid: user.id,
          title: "Software Engineer",
          salary: "100000",
          location: "New York, NY",
          link: "",
          status: "APPLIED",
          company: "Tech Corp",
          dateapplied: new Date("2025-01-15"),
          description: "",
        },
        {
          ownerid: user.id,
          title: "Data Scientist",
          salary: "120000",
          location: "San Francisco, CA",
          link: "",
          status: "INTERVIEWING",
          company: "Data Solutions Inc.",
          dateapplied: new Date("2025-02-20"),
          description: "",
        },
        {
          ownerid: user.id,
          title: "Product Manager",
          salary: "130000",
          location: "Austin, TX",
          status: "ACCEPTED",
          company: "Innovatech",
          link: "",
          dateapplied: new Date("2025-03-10"),
          description: "",
        },
        {
          ownerid: user.id,
          title: "Software Engineer",
          salary: "100000",
          location: "New York, NY",
          link: "",
          status: "APPLIED",
          company: "Tech Corp",
          dateapplied: new Date("2025-01-15"),
          description: "",
        },
        {
          ownerid: user.id,
          title: "Data Scientist",
          salary: "120000",
          location: "San Francisco, CA",
          link: "",
          status: "INTERVIEWING",
          company: "Data Solutions Inc.",
          dateapplied: new Date("2025-02-20"),
          description: "",
        },
        {
          ownerid: user.id,
          title: "Product Manager",
          salary: "130000",
          location: "Austin, TX",
          status: "ACCEPTED",
          company: "Innovatech",
          link: "",
          dateapplied: new Date("2025-03-10"),
          description: "",
        },
      ],
    });
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    console.log("Exiting seed script");
  }
};

restDatabase();
seedDatabase();
