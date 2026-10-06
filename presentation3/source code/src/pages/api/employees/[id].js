import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const employee = await prisma.employee.findUnique({
        where: { employee_id: id },
        include: {
          attendance: true,
          employee_shifts: { include: { shift: true } },
          leave_requests: true,
          admin_user: true
        }
      });
      if (!employee) return res.status(404).json({ error: 'Employee not found' });
      return res.status(200).json(employee);
    }

    if (req.method === 'DELETE') {
      const deleted = await prisma.employee.delete({
        where: { employee_id: id }
      });

      await prisma.activityLog.create({
        data: {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          type: 'DELETE',
          description: `Deleted employee "${deleted.name}" (${deleted.employee_id}) from EMPLOYEE table.`
        }
      });

      return res.status(200).json({ success: true, deleted });
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const data = { ...req.body };
      delete data.employee_id; // primary key should not be mutated directly
      if (data.salary) data.salary = parseFloat(data.salary);

      const updated = await prisma.employee.update({
        where: { employee_id: id },
        data
      });

      await prisma.activityLog.create({
        data: {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          type: 'UPDATE',
          description: `Updated employee details for "${updated.name}" (${updated.employee_id}).`
        }
      });

      return res.status(200).json(updated);
    }

    res.setHeader('Allow', ['GET', 'DELETE', 'PUT', 'PATCH']);
    return res.status(455).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(`API Error in /api/employees/${id}:`, error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
