import React, { useEffect, useState } from "react";
import "./MovieDetails.scss";
import {  MOVIE_DETAIL } from "../../../endpoint";
import { useParams } from 'react-router-dom'


export const MovieDetails = ({ fields }) => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);

  const fetchData = async (id) => {
    try {
      const response = await fetch(MOVIE_DETAIL(id));
      const data = await response.json();
      console.log(data)
      setMovieDetail(data);


    } catch (error) {
      console.error(`Error fetching data for ${id}:`, error);
    }
  };

  useEffect(() => {
    fetchData(id)
  }, []);
  return (
    <div className="blog-details">
      <div className="hero-section-parent">
        <br></br><br></br><br></br>


        <div className="blog-details-hero-section mb_22 mt-5">
          <div className="container">
            <div className="row g-0">
              <div className="col-lg-5 align-items-center d-flex justify-content-center">
                <img src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`} alt={movieDetail.original_title} />
              </div>
              <div className="col-lg-7 align-items-center d-flex justify-content-center">
                <div className="blog-details-hero-texts">
                  <div className="blog-details-hero-dates">
                    <span> Release Date : </span> |{" "}
                    <span> {movieDetail?.release_date} </span>
                  </div>
                  <div className="blog-details-hero-heading">
                    {movieDetail?.original_title}
                  </div>
                  <div className="mt-3"> <h4>Source Link : </h4>{movieDetail?.homepage}</div>
                  <div className="mt-4"> <h4>Popularity : {movieDetail?.popularity}</h4></div>
                  <div className="mt-4"> <h4>Rating : {movieDetail?.vote_average} / 10 from {movieDetail?.vote_count} Users</h4></div>
                  <div className="mt-4"><h4>Movie Genres</h4>
                    {movieDetail?.genres?.map((genre) => (
                      <span className="genre">
                        <button className="btn btn-danger" key={genre.id}>{`${genre.name} (ID: ${genre.id})`}</button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-4"><h4>Production Companies</h4>
                    {movieDetail?.production_companies?.map((company) => (
                      <span className="genre">
                        <button className="btn btn-danger" key={company.id}>{`${company.name}`}</button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-4"><h4>Production Countries</h4>
                    {movieDetail?.production_countries?.map((country) => (
                      <span className="genre">
                        <button className="btn btn-danger" key={country.id}>{`${country.name}`}</button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-4"><h4>Production Languages</h4>
                    {movieDetail?.spoken_languages?.map((language) => (
                      <span className="genre">
                        <button className="btn btn-danger" key={language.id}>{`${language.name}`}</button>
                      </span>
                    ))}
                  </div>
                  
                  
                </div>
              </div>
            </div>
            <div className="blog-details-hero-desc mt-5">
                    <h4>About Movie</h4>
                    {movieDetail?.overview}
                  </div>
          </div>
        </div>
      </div>
    </div>
  );
};
