import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const JWT_SECRET = process.env.TOKEN_SECRET_KEY;

export async function hashPassword(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error('Password hashing failed');
    }
  }
  
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      throw new Error('Password comparison failed');
    }
  }

export function generateToken(subject: any) {
    const payload = {
      id: subject.uuid,
      role: subject.role
    };
  
    /* const options = {
      expiresIn: '1h'
    }; */
  
    return jwt.sign(payload, JWT_SECRET);
  }
  
export function verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Token invalide');
    }
  }