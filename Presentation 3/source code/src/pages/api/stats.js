import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const [totalEmployees, totalShifts, pendingLeaves, attendanceRecords] = await Promise.all([
      prisma.employee.count(),
      prisma.shift.count(),
      prisma.lEAVE.count({ where: { Status: 'Pending' } }),
      prisma.attendance.findMany()
    ]);

    const presentCount = attendanceRecords.filter((a) => a.Status === 'Present' || a.Status === 'Late').length;
    const rate = totalEmployees > 0 ? Math.round((presentCount / totalEmployees) * 100) : 0;

    return res.status(200).json({
      totalEmployees,
      activeShifts: totalShifts,
      pendingLeaves,
      attendanceRate: `${rate}%`
    });
  } catch (error) {
    console.error('API Error in /api/stats:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
