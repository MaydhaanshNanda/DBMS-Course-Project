import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'DELETE') {
      const deleted = await prisma.attendance.delete({
        where: { attendance_id: id }
      });

      await prisma.activityLog.create({
        data: {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          type: 'DELETE',
          description: `Deleted attendance record ${id} from ATTENDANCE table.`
        }
      });

      return res.status(200).json({ success: true, deleted });
    }

    res.setHeader('Allow', ['DELETE']);
    return res.status(455).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(`API Error in /api/attendance/${id}:`, error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
