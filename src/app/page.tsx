"use client";
import { ok } from "assert";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  name: string;
};
export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState<Movie>();
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<number>(0);

  async function getMovies() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies`);
    const data = await res.json();
    setMovies(data);
  }
  async function addMovie() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    const data = await res.json();
    setMovies(data);
  }
  async function movieDetails(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/details/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setNewMovie(data);
  }
  async function updateMovie(id: number) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/update/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
          }),
        }
      );

      getMovies();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  }

  async function deleteMovie(id: number) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      getMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  }
  useEffect(() => {
    getMovies();
    console.log(movies);
  }, []);
  return (
    <div>
      <div className="w-[400px] h-[200px] border">
        <div className="button-add">
          <button
            onClick={() => {
              addMovie();
            }}
            className="border rounded w-[50px]"
          >
            Add
          </button>
          <input
            onChange={(e) => {
              setName(e.target.value);
              console.log(name);
            }}
          />
        </div>
        <div className="button-find">
          <button
            onClick={() => {
              movieDetails(id);
            }}
            className="border rounded w-[50px]"
          >
            find
          </button>
          <input
            onChange={(e) => {
              setId(Number(e.target.value));
              console.log(typeof id);
            }}
          />
          <div>{newMovie?.name}</div>
        </div>

        {movies.map((movie) => (
          <div key={movie.id} className="flex justify-between">
            <div>{movie.name}</div>
            <div className="gap-5">
              <button
                className="border rounded"
                onClick={() => {
                  updateMovie(movie.id);
                }}
              >
                Edit
              </button>
              <input
                type="text"
                placeholder="New..."
                onChange={(e) => setName(e.target.value)}
                className="border rounded"
              />

              <button
                className="border rounded"
                onClick={() => {
                  deleteMovie(movie.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
