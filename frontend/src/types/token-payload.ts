import { JwtPayload } from 'jwt-decode';

export interface Payload extends JwtPayload {
  id: number;
  username: string;
  avatar: string;
  description: string;
}
