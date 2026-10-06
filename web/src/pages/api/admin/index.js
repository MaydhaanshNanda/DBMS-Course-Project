import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const users = await prisma.adminUser.findMany({
        orderBy: { User_ID: 'asc' },
        include: { EMPLOYEE: true }
      });

      const normalized = users.map((u) => ({
        user_id: String(u.User_ID),
        User_ID: u.User_ID,
        employee_id: u.Employee_ID ? String(u.Employee_ID) : null,
        Employee_ID: u.Employee_ID,
        username: u.Username,
        email: u.EMPLOYEE?.Email || `${u.Username}@university.edu`,
        role: u.Role,
        status: 'Active',
        last_login: '2026-10-06 17:00'
      }));

      return res.status(200).json(normalized);
    }

    if (req.method === 'POST') {
      const { username, role = 'Employee', employee_id } = req.body;
      if (!username) return res.status(400).json({ error: 'Username is required.' });

      const empId = employee_id ? parseInt(String(employee_id).replace(/\D/g, ''), 10) : null;

      const maxUser = await prisma.adminUser.findFirst({
        orderBy: { User_ID: 'desc' }
      });
      const newUserId = (maxUser ? maxUser.User_ID : 0) + 1;

      const created = await prisma.adminUser.create({
        data: {
          User_ID: newUserId,
          Username: username,
          Role: role,
          Employee_ID: empId
        }
      });

      return res.status(201).json({
        user_id: String(created.User_ID),
        employee_id: created.Employee_ID ? String(created.Employee_ID) : null,
        username: created.Username,
        email: `${created.Username}@university.edu`,
        role: created.Role,
        status: 'Active',
        last_login: 'Just Now'
      });
    }

    if (req.method === 'DELETE') {
      const idRaw = req.query.id || req.body.id || req.query.user_id;
      if (!idRaw) return res.status(400).json({ error: 'User ID required.' });
      const id = parseInt(String(idRaw).replace(/\D/g, ''), 10);

      const deleted = await prisma.adminUser.delete({
        where: { User_ID: id }
      });

      return res.status(200).json({ success: true, deleted });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error in /api/admin:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
