import React, {useEffect, useState}from "react";

import Card from"../Component/Card";
import Genere from"../Component/Genere";
import Pagination from"../Component/Pagination"

function Home() {
  const [movies,setMovies]=useState([])
  const [currentPage,setCurrentPage]=useState[1]
  const moviesPerPage=5
  useEffect(()=>{
    fetchMovies()
  },[]);
  const fetchMovies=async()=>{
    try{
      const res=await fetch(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/movies`);
      const data=await res.json()
      setMovies(data)

    }catch(err){
      console.log(err)
    }
  }

  const handlePageChange=(pageNumber)=>{
    setCurrentPage(pageNumber)
  };

  const indexOfLastMovie=currentPage*moviesPerPage;
  const indexOfFirstMovies=indexofLastMovies-moviesPerPage

  const currentMovies=movies.slice(indexOfFirstMovies,indexOfLastMovies)
  

  return (
    
      <div data-test-id="container">
        <h1>Movie Rating</h1>
        {currentMovies.map((movie)=>(
          <Card key={movie.id}>
          <h2>{movie.name}</h2>
          <img src={movie.pics} alt="" />
          <p>Actor:{movie.actor}</p>
          <p>Language:{movie.language}</p>
          <p>No. of review:{movie.noofreview}</p>
          <p>Average review:{movie.averagereview}</p>
          <div>
            {movie.genere.map((genere)=>(
              <Genere key={genre}>{genre}</Genere>
            ))}
          </div>
          <button onClick={()=>{
            handleRate(movie.id)
          }}>Rate Movie

          </button>
          </Card>

        ))}
<Pagination>
        itemsPerPage={moviesPerPage}
        totalItems={movies.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      </Pagination>
        
      </div>
      // {/* Here will come the Pagination component */}
      
    
  );
}

export default Home;
