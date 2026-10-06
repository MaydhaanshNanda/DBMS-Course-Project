import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const leaves = await prisma.lEAVE.findMany({
        orderBy: { Leave_ID: 'desc' },
        include: { EMPLOYEE: true }
      });

      const normalized = leaves.map((l) => {
        const startStr = l.Start_Date ? new Date(l.Start_Date).toISOString().split('T')[0] : '';
        const endStr = l.End_Date ? new Date(l.End_Date).toISOString().split('T')[0] : '';
        return {
          leave_id: String(l.Leave_ID),
          Leave_ID: l.Leave_ID,
          employee_id: String(l.Employee_ID),
          Employee_ID: l.Employee_ID,
          leave_type: l.Leave_Type || 'Casual Leave',
          start_date: startStr,
          end_date: endStr,
          reason: l.Reason || 'Personal Reasons',
          status: l.Status || 'Pending',
          applied_on: startStr || '2026-09-01'
        };
      });

      return res.status(200).json(normalized);
    }

    if (req.method === 'POST') {
      const {
        employee_id,
        leave_type,
        start_date,
        end_date,
        reason,
        status = 'Pending'
      } = req.body;

      const empId = parseInt(String(employee_id).replace(/\D/g, ''), 10);
      if (!empId) return res.status(400).json({ error: 'Valid employee_id required.' });

      const maxLeave = await prisma.lEAVE.findFirst({
        orderBy: { Leave_ID: 'desc' }
      });
      const newLeaveId = (maxLeave ? maxLeave.Leave_ID : 2000) + 1;

      const created = await prisma.lEAVE.create({
        data: {
          Leave_ID: newLeaveId,
          Employee_ID: empId,
          Leave_Type: leave_type || 'Casual Leave',
          Start_Date: start_date ? new Date(start_date) : new Date(),
          End_Date: end_date ? new Date(end_date) : new Date(),
          Reason: reason || 'Personal Reasons',
          Status: status
        }
      });

      return res.status(201).json({
        leave_id: String(created.Leave_ID),
        employee_id: String(created.Employee_ID),
        leave_type: created.Leave_Type,
        start_date: created.Start_Date ? new Date(created.Start_Date).toISOString().split('T')[0] : '',
        end_date: created.End_Date ? new Date(created.End_Date).toISOString().split('T')[0] : '',
        reason: created.Reason,
        status: created.Status,
        applied_on: new Date().toISOString().split('T')[0]
      });
    }

    if (req.method === 'PATCH' || req.method === 'PUT') {
      const { leave_id, status } = req.body;
      const lId = parseInt(String(leave_id).replace(/\D/g, ''), 10);
      if (!lId || !status) return res.status(400).json({ error: 'leave_id and status required.' });

      const updated = await prisma.lEAVE.update({
        where: { Leave_ID: lId },
        data: { Status: status }
      });

      return res.status(200).json({
        leave_id: String(updated.Leave_ID),
        employee_id: String(updated.Employee_ID),
        leave_type: updated.Leave_Type,
        status: updated.Status
      });
    }

    if (req.method === 'DELETE') {
      const idRaw = req.query.id || req.body.id || req.query.leave_id;
      if (!idRaw) return res.status(400).json({ error: 'Leave ID required.' });
      const id = parseInt(String(idRaw).replace(/\D/g, ''), 10);

      const deleted = await prisma.lEAVE.delete({
        where: { Leave_ID: id }
      });

      return res.status(200).json({ success: true, deleted });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error in /api/leave:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
