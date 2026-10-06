import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const records = await prisma.attendance.findMany({
        orderBy: { Date: 'desc' },
        include: { EMPLOYEE: true }
      });

      const normalized = records.map((a) => {
        const dateStr = a.Date ? new Date(a.Date).toISOString().split('T')[0] : '';
        const checkIn = a.Check_In ? new Date(a.Check_In).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';
        const checkOut = a.Check_Out ? new Date(a.Check_Out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--';
        return {
          attendance_id: String(a.Attendance_ID),
          Attendance_ID: a.Attendance_ID,
          employee_id: String(a.Employee_ID),
          Employee_ID: a.Employee_ID,
          date: dateStr,
          check_in: checkIn,
          check_out: checkOut,
          status: a.Status || 'Present',
          notes: a.Status === 'Late' ? 'Late Arrival' : (a.Status === 'Present' ? 'Punctual' : 'Absence')
        };
      });

      return res.status(200).json(normalized);
    }

    if (req.method === 'POST') {
      const { employee_id, date, status = 'Present', check_in, check_out } = req.body;
      const empId = parseInt(String(employee_id).replace(/\D/g, ''), 10);
      if (!empId) return res.status(400).json({ error: 'Valid employee_id required.' });

      const dateObj = date ? new Date(date) : new Date();

      const maxAtt = await prisma.attendance.findFirst({
        orderBy: { Attendance_ID: 'desc' }
      });
      const newAttId = (maxAtt ? maxAtt.Attendance_ID : 1000) + 1;

      // Handle check-in and check-out time
      const now = new Date();
      const inTime = check_in ? new Date(`1970-01-01T${check_in}:00`) : now;
      const outTime = check_out ? new Date(`1970-01-01T${check_out}:00`) : null;

      const record = await prisma.attendance.upsert({
        where: {
          Employee_ID_Date: {
            Employee_ID: empId,
            Date: dateObj
          }
        },
        update: {
          Status: status,
          Check_In: inTime,
          Check_Out: outTime
        },
        create: {
          Attendance_ID: newAttId,
          Employee_ID: empId,
          Date: dateObj,
          Status: status,
          Check_In: inTime,
          Check_Out: outTime
        }
      });

      return res.status(201).json({
        attendance_id: String(record.Attendance_ID),
        employee_id: String(record.Employee_ID),
        date: new Date(record.Date).toISOString().split('T')[0],
        status: record.Status,
        check_in: inTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        check_out: outTime ? outTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'
      });
    }

    if (req.method === 'DELETE') {
      const idRaw = req.query.id || req.body.id || req.query.attendance_id;
      if (!idRaw) return res.status(400).json({ error: 'Attendance ID required.' });
      const id = parseInt(String(idRaw).replace(/\D/g, ''), 10);

      const deleted = await prisma.attendance.delete({
        where: { Attendance_ID: id }
      });

      return res.status(200).json({ success: true, deleted });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error in /api/attendance:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
