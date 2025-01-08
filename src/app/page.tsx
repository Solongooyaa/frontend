'use client'
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  name: string;
}
export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
async function getMovies(){
  const res = await fetch('http://localhost:4000/movies')
  const data = await res.json()
  setMovies(data)
}

  useEffect(() => {

getMovies()
  },[])
  return (
    <div>
      <button>
        
      {movies.map((movie) => (
        <div key={movie.id}>{movie.name}</div>
      ))}
      </button>
      
    
    </div>
  );
}
