import MinyanFinder from "./minyan-finder";

export const metadata = {
  title: "Find a Minyan | Catskills Eruv",
  description: "Explore sample Catskills minyan schedules and local shuls.",
};

export default async function MinyanimPage({ searchParams }) {
  const query = await searchParams;
  return <MinyanFinder key={JSON.stringify(query)} initialFilters={query} />;
}
