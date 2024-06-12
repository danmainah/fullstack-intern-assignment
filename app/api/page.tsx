import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { setUser, setToken } from '../../redux/auth/auth.slice'; // Import the actions from your auth slice

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        res.status(401).json({ message: 'Missing bearer token in your header' });
        return;
      }

      try {
        const userData = jwt.verify(token, 'my-secret'); 
        setUser(userData as { username: string });
        setToken(token);

        res.status(200).json({ message: 'Authenticated', user: userData });
      } catch (error) {
        // If the token is invalid, return a 403 status code
        res.status(403).json({ message: 'Invalid bearer token', error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
