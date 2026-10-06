import { exec } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const seedScript = path.join(process.cwd(), 'prisma', 'seed.js');
  exec(`node "${seedScript}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Reset seed error:', error, stderr);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ success: true, message: 'Database reset to seed data' });
  });
}
