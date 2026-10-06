const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding MySQL database EmployeeManagementDB via Prisma ORM...');

  const dataPath = path.join(__dirname, 'current_data.json');
  const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  // 1. Delete in reverse dependency order
  await prisma.attendance.deleteMany();
  await prisma.employeeShift.deleteMany();
  await prisma.lEAVE.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.shift.deleteMany();
  await prisma.employee.deleteMany();

  // 2. Insert Employees
  console.log(`Inserting ${rawData.emp.length} Employees...`);
  for (const emp of rawData.emp) {
    await prisma.employee.create({ data: emp });
  }

  // 3. Insert Shifts
  console.log(`Inserting ${rawData.shifts.length} Shifts...`);
  for (const s of rawData.shifts) {
    await prisma.shift.create({
      data: {
        Shift_ID: s.Shift_ID,
        Shift_Name: s.Shift_Name,
        Start_Time: new Date(s.Start_Time),
        End_Time: new Date(s.End_Time)
      }
    });
  }

  // 4. Insert Employee Shifts
  console.log(`Inserting ${rawData.es.length} Employee Shifts...`);
  for (const es of rawData.es) {
    await prisma.employeeShift.create({
      data: {
        Employee_ID: es.Employee_ID,
        Shift_ID: es.Shift_ID,
        Assigned_Date: new Date(es.Assigned_Date)
      }
    });
  }

  // 5. Insert Attendance
  console.log(`Inserting ${rawData.att.length} Attendance records...`);
  for (const a of rawData.att) {
    await prisma.attendance.create({
      data: {
        Attendance_ID: a.Attendance_ID,
        Employee_ID: a.Employee_ID,
        Date: new Date(a.Date),
        Check_In: a.Check_In ? new Date(a.Check_In) : null,
        Check_Out: a.Check_Out ? new Date(a.Check_Out) : null,
        Status: a.Status
      }
    });
  }

  // 6. Insert Leave
  console.log(`Inserting ${rawData.leaves.length} Leave records...`);
  for (const l of rawData.leaves) {
    await prisma.lEAVE.create({
      data: {
        Leave_ID: l.Leave_ID,
        Employee_ID: l.Employee_ID,
        Leave_Type: l.Leave_Type,
        Start_Date: l.Start_Date ? new Date(l.Start_Date) : null,
        End_Date: l.End_Date ? new Date(l.End_Date) : null,
        Reason: l.Reason,
        Status: l.Status
      }
    });
  }

  // 7. Insert Admin Users
  console.log(`Inserting ${rawData.admins.length} Admin Users...`);
  for (const adm of rawData.admins) {
    await prisma.adminUser.create({
      data: {
        User_ID: adm.User_ID,
        Employee_ID: adm.Employee_ID,
        Username: adm.Username,
        Role: adm.Role
      }
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
