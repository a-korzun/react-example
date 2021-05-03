export default async function getList(): Promise<{ count: number; entries: Record<string, string | boolean>[] }> {
  const data = await fetch('https://api.publicapis.org/entries')
    .then((response) => response.json());

  return data;
}
