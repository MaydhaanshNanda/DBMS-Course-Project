import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const [shifts, employeeShifts] = await Promise.all([
        prisma.shift.findMany({ orderBy: { Shift_ID: 'asc' } }),
        prisma.employeeShift.findMany({ include: { EMPLOYEE: true, SHIFT: true } })
      ]);

      const normalizedShifts = shifts.map((s) => {
        const startTime = s.Start_Time ? new Date(s.Start_Time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '09:00 AM';
        const endTime = s.End_Time ? new Date(s.End_Time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '05:00 PM';
        return {
          shift_id: String(s.Shift_ID),
          Shift_ID: s.Shift_ID,
          shift_name: s.Shift_Name,
          start_time: startTime,
          end_time: endTime,
          description: `Active operational window: ${s.Shift_Name}`,
          max_capacity: 20
        };
      });

      const normalizedES = employeeShifts.map((es) => ({
        assignment_id: `ES-${es.Employee_ID}-${es.Shift_ID}`,
        employee_id: String(es.Employee_ID),
        shift_id: String(es.Shift_ID),
        effective_date: es.Assigned_Date ? new Date(es.Assigned_Date).toISOString().split('T')[0] : '2026-09-01',
        status: 'Assigned'
      }));

      return res.status(200).json({ shifts: normalizedShifts, employeeShifts: normalizedES });
    }

    if (req.method === 'POST') {
      const { shift_name, start_time, end_time } = req.body;
      if (!shift_name) return res.status(400).json({ error: 'shift_name is required' });

      const maxShift = await prisma.shift.findFirst({ orderBy: { Shift_ID: 'desc' } });
      const newShiftId = (maxShift ? maxShift.Shift_ID : 0) + 1;

      const created = await prisma.shift.create({
        data: {
          Shift_ID: newShiftId,
          Shift_Name: shift_name,
          Start_Time: new Date(`1970-01-01T${start_time || '09:00'}:00`),
          End_Time: new Date(`1970-01-01T${end_time || '17:00'}:00`)
        }
      });

      return res.status(201).json({
        shift_id: String(created.Shift_ID),
        shift_name: created.Shift_Name,
        start_time: '09:00 AM',
        end_time: '05:00 PM',
        description: `Operational shift ${created.Shift_Name}`,
        max_capacity: 20
      });
    }

    if (req.method === 'DELETE') {
      const idRaw = req.query.id || req.body.id;
      if (!idRaw) return res.status(400).json({ error: 'Shift ID required' });
      const id = parseInt(String(idRaw).replace(/\D/g, ''), 10);

      await prisma.employeeShift.deleteMany({ where: { Shift_ID: id } });
      const deleted = await prisma.shift.delete({ where: { Shift_ID: id } });

      return res.status(200).json({ success: true, deleted });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error in /api/shifts:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
