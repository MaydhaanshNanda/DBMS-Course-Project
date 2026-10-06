import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { employee_id, shift_id, effective_date } = req.body;
    const empId = parseInt(String(employee_id).replace(/\D/g, ''), 10);
    const sId = parseInt(String(shift_id).replace(/\D/g, ''), 10);

    if (!empId || !sId) {
      return res.status(400).json({ error: 'Valid employee_id and shift_id are required' });
    }

    const dateObj = effective_date ? new Date(effective_date) : new Date();

    // Remove any previous shift assignments for this employee
    await prisma.employeeShift.deleteMany({
      where: { Employee_ID: empId }
    });

    const newAssignment = await prisma.employeeShift.create({
      data: {
        Employee_ID: empId,
        Shift_ID: sId,
        Assigned_Date: dateObj
      }
    });

    return res.status(200).json({
      assignment_id: `ES-${newAssignment.Employee_ID}-${newAssignment.Shift_ID}`,
      employee_id: String(newAssignment.Employee_ID),
      shift_id: String(newAssignment.Shift_ID),
      effective_date: new Date(newAssignment.Assigned_Date).toISOString().split('T')[0],
      status: 'Assigned'
    });
  } catch (error) {
    console.error('Error in /api/shifts/assign:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
