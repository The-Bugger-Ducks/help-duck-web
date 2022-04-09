export default function validateStatus(status: number) {
  return (status >= 200 && status < 300) || status === 302;
}

