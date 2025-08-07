export type Protocol = 'http' | 'https' | 'ws' | 'smtp';

export function generateUrl(
  protocol: Protocol,
  host: string,
  port: number,
  otherUrl?: string,
) {
  return `${protocol}://${host}:${port}/${otherUrl}`;
}
