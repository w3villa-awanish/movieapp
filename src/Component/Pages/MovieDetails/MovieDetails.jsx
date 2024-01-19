import React, { useEffect, useState } from "react";
import "./MovieDetails.scss";
import {  MOVIE_DETAIL, RELATED_MOVIE } from "../../../endpoint";
import { useParams } from 'react-router-dom'
import { NavLink, useNavigate } from "react-router-dom";


export const MovieDetails = ({ fields }) => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [relatedMovie, setRelatedMovie] = useState([]);

  const fetchData = async (id) => {
    try {
      const response = await fetch(MOVIE_DETAIL(id));
      const data = await response.json();
      //console.log(data)
      setMovieDetail(data);

      const response_2 = await fetch(RELATED_MOVIE(id));
      const data_2 = await response_2.json();
      //console.log(data_2)
      setRelatedMovie(data_2);


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
      
      <section className="section-spacing-y">
        <div className="container">
          <div className="gx-5 row">
            <div className="col-xl-12 order-1 order-xl-0">
              <div className="primary-section-heading mb_22 mt-5 mt-xl-0">
                Similar Movie
              </div>
              <div className="gx-5 row blog-custom-row">
                {
                  
                  relatedMovie?.total_pages > 0 && relatedMovie?.results ?
                  relatedMovie['results']?.map((field, index) => (
                        <div className="col-lg-2 blog-custom-cols" key={index}>
                          <div className="blog-card">
                            <div className="img-box">
                              <img src={`https://image.tmdb.org/t/p/w500/${field.poster_path}`} alt={field.original_title} />
                            </div>
                            <div className="created-by">
                              <span>Release </span>
                              <span>{field.release_date}</span>
                            </div>
                            <div className="card-heading">{field.original_title}</div>
                            <div className="card-link">
                              <NavLink to={`/movieDetail/${field.id}`}>Read More</NavLink>
                            </div>
                          </div>
                        </div>
                      )) :
                      <div className="col-lg-12 blog-custom-cols">
                        <div className="blog-card">No Movie found</div>
                      </div>
                }

              </div>
             
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
