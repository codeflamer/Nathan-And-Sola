import WellWishesClient from "./WellWishesClient";

export type Wish = { name: string; message: string };

async function getApprovedWishes(): Promise<Wish[]> {
  const endpoint = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
  if (!endpoint) return [];

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 10 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function WellWishes() {
  const wishes = await getApprovedWishes();
  return <WellWishesClient wishes={wishes} />;
}
