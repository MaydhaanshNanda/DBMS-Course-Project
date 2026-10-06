import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const emps = await prisma.employee.findMany({
        orderBy: { Employee_ID: 'asc' }
      });

      const normalized = emps.map((e) => ({
        employee_id: String(e.Employee_ID),
        Employee_ID: e.Employee_ID,
        name: e.Name,
        Name: e.Name,
        email: e.Email || '',
        phone: e.Phone || '',
        department: e.Department || 'General',
        designation: e.Designation || 'Staff',
        status: 'Active',
        join_date: '2024-01-15',
        salary: 75000
      }));

      return res.status(200).json(normalized);
    }

    if (req.method === 'POST') {
      const {
        first_name,
        last_name,
        name,
        email,
        phone,
        department,
        designation,
        employee_id
      } = req.body;

      const fullName = name || `${first_name || ''} ${last_name || ''}`.trim();
      if (!fullName || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
      }

      // Calculate new Employee_ID as integer
      let newId;
      if (employee_id) {
        const parsed = parseInt(String(employee_id).replace(/\D/g, ''), 10);
        newId = !isNaN(parsed) && parsed > 0 ? parsed : null;
      }
      if (!newId) {
        const maxEmp = await prisma.employee.findFirst({
          orderBy: { Employee_ID: 'desc' }
        });
        newId = (maxEmp ? maxEmp.Employee_ID : 100) + 1;
      }

      const created = await prisma.employee.create({
        data: {
          Employee_ID: newId,
          Name: fullName,
          Email: email,
          Phone: phone || '',
          Department: department || 'General',
          Designation: designation || 'Staff'
        }
      });

      // Default shift assignment
      try {
        const firstShift = await prisma.shift.findFirst();
        if (firstShift) {
          await prisma.employeeShift.create({
            data: {
              Employee_ID: newId,
              Shift_ID: firstShift.Shift_ID,
              Assigned_Date: new Date()
            }
          });
        }
      } catch (e) {
        console.warn('Could not auto-assign shift:', e);
      }

      const normalized = {
        employee_id: String(created.Employee_ID),
        Employee_ID: created.Employee_ID,
        name: created.Name,
        Name: created.Name,
        email: created.Email,
        phone: created.Phone,
        department: created.Department,
        designation: created.Designation,
        status: 'Active',
        join_date: new Date().toISOString().split('T')[0],
        salary: 75000
      };

      return res.status(201).json(normalized);
    }

    if (req.method === 'DELETE') {
      const idRaw = req.query.id || req.body.id || req.query.employee_id || req.body.employee_id;
      if (!idRaw) return res.status(400).json({ error: 'Employee ID required.' });
      const id = parseInt(String(idRaw).replace(/\D/g, ''), 10);

      // Delete dependent records first to satisfy FK constraints
      await prisma.attendance.deleteMany({ where: { Employee_ID: id } });
      await prisma.employeeShift.deleteMany({ where: { Employee_ID: id } });
      await prisma.lEAVE.deleteMany({ where: { Employee_ID: id } });
      await prisma.adminUser.deleteMany({ where: { Employee_ID: id } });

      const deleted = await prisma.employee.delete({
        where: { Employee_ID: id }
      });

      return res.status(200).json({ success: true, deleted });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error in /api/employees:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
