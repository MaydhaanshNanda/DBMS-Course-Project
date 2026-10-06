import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'DELETE') {
      const deleted = await prisma.leaveRequest.delete({
        where: { leave_id: id }
      });

      await prisma.activityLog.create({
        data: {
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          type: 'DELETE',
          description: `Deleted leave request ${id} from LEAVE_REQUEST table.`
        }
      });

      return res.status(200).json({ success: true, deleted });
    }

    res.setHeader('Allow', ['DELETE']);
    return res.status(455).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(`API Error in /api/leave/${id}:`, error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
