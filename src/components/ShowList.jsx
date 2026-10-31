import ShowCard from "./ShowCard.jsx";

export default function ShowList({ shows }) {
  return (
    <div className="show-grid">
      {shows.map((show) => <ShowCard key={show.id} show={show} />)}
    </div>
  );
}
