const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a clinic
  const clinic = await prisma.clinic.create({
    data: {
      name: "Access Afya Clinic",
      address: "123 Health St, Nairobi",
    },
  });

  // Function to create patients and associate them with the clinic
  async function createPatient(patientData) {
    return prisma.patient.create({
      data: {
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        dateOfBirth: patientData.dateOfBirth,
        gender: patientData.gender,
        visits: {
          create: patientData.visits.map(visit => ({
            date: visit.date,
            metrics: {
              create: visit.metrics.map(metric => ({
                date: metric.date,
                value: metric.value,
                type: metric.type,
              }))
            }
          }))
        },
        metrics: {
          create: patientData.metrics.map(metric => ({
            date: metric.date,
            value: metric.value,
            type: metric.type,
          }))
        },
        clinic: {
          connect: {
            id: clinic.id // Use the clinic ID created above
          }
        }
      }
    });
  }

  // Define patients data
  const patientsData = [
    {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: new Date("1990-01-01"),
      gender: "Male",
      visits: [
        {
          date: new Date(),
          metrics: [
            { date: new Date(), value: 37.5, type: "TEMPERATURE" },
            { date: new Date(), value: 120, type: "BLOOD_PRESSURE" },
          ],
        },
      ],
      metrics: [{ date: new Date(), value: 80, type: "HEART_RATE" }],
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      dateOfBirth: new Date("1985-05-15"),
      gender: "Female",
      visits: [
        {
          date: new Date(),
          metrics: [
            { date: new Date(), value: 36.8, type: "TEMPERATURE" },
            { date: new Date(), value: 110, type: "BLOOD_PRESSURE" },
          ],
        },
      ],
      metrics: [{ date: new Date(), value: 75, type: "HEART_RATE" }],
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      dateOfBirth: new Date("1992-07-20"),
      gender: "Female",
      visits: [
        {
          date: new Date(),
          metrics: [
            { date: new Date(), value: 37.0, type: "TEMPERATURE" },
            { date: new Date(), value: 115, type: "BLOOD_PRESSURE" },
          ],
        },
      ],
      metrics: [{ date: new Date(), value: 78, type: "HEART_RATE" }],
    },
    {
      firstName: "Bob",
      lastName: "Brown",
      dateOfBirth: new Date("1980-03-10"),
      gender: "Male",
      visits: [
        {
          date: new Date(),
          metrics: [
            { date: new Date(), value: 36.5, type: "TEMPERATURE" },
            { date: new Date(), value: 125, type: "BLOOD_PRESSURE" },
          ],
        },
      ],
      metrics: [{ date: new Date(), value: 82, type: "HEART_RATE" }],
    },
    {
      firstName: "Charlie",
      lastName: "Davis",
      dateOfBirth: new Date("1975-11-30"),
      gender: "Male",
      visits: [
        {
          date: new Date(),
          metrics: [
            { date: new Date(), value: 37.2, type: "TEMPERATURE" },
            { date: new Date(), value: 118, type: "BLOOD_PRESSURE" },
          ],
        },
      ],
      metrics: [{ date: new Date(), value: 79, type: "HEART_RATE" }],
    },
    {
      firstName: "Diana",
      lastName: "Evans",
      dateOfBirth: new Date("1995-09-25"),
      gender: "Female",
      visits: [
        {
          date: new Date(),
          metrics: [
            { date: new Date(), value: 36.9, type: "TEMPERATURE" },
            { date: new Date(), value: 112, type: "BLOOD_PRESSURE" },
          ],
        },
      ],
      metrics: [{ date: new Date(), value: 76, type: "HEART_RATE" }],
    },
    {
      firstName: "Edward",
      lastName: "Franklin",
      dateOfBirth: new Date("1988-02-14"),
      gender: "Male",
      visits: [
        {
          date: new Date(),
          metrics: [
            { date: new Date(), value: 37.1, type: "TEMPERATURE" },
            { date: new Date(), value: 117, type: "BLOOD_PRESSURE" },
          ],
        },
      ],
      metrics: [{ date: new Date(), value: 81, type: "HEART_RATE" }],
    },
    {
      firstName: "Fiona",
      lastName: "Green",
      dateOfBirth: new Date("1993-06-18"),
      gender: "Female",
      visits: [
        {
          date: new Date(),
          metrics: [
            { date: new Date(), value: 36.7, type: "TEMPERATURE" },
            { date: new Date(), value: 113, type: "BLOOD_PRESSURE" },
          ],
        },
      ],
      metrics: [{ date: new Date(), value: 77, type: "HEART_RATE" }],
    },
    {
      firstName: "George",
      lastName: "Harris",
      dateOfBirth: new Date("1978-12-05"),
      gender: "Male",
      visits: [
        {
          date: new Date(),
          metrics: [
            { date: new Date(), value: 37.3, type: "TEMPERATURE" },
            { date: new Date(), value: 119, type: "BLOOD_PRESSURE" },
          ],
        },
      ],
      metrics: [{ date: new Date(), value: 80, type: "HEART_RATE" }],
    },
    {
      firstName: "Hannah",
      lastName: "Ivy",
      dateOfBirth: new Date("1982-04-22"),
      gender: "Female",
      visits: [
        {
          date: new Date(),
          metrics: [
            { date: new Date(), value: 36.6, type: "TEMPERATURE" },
            { date: new Date(), value: 114, type: "BLOOD_PRESSURE" },
          ],
        },
      ],
      metrics: [{ date: new Date(), value: 78, type: "HEART_RATE" }],
    },
  ];

  // Create patients one by one and associate them with the clinic
  const patients = await Promise.all(patientsData.map(patient => createPatient({ ...patient, clinicId: clinic.id })));
  console.log("Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });