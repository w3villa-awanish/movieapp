import React, { useEffect, useState } from "react";
import "./Movie.scss";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MOVIE_LIST,
} from "../../../endpoint";
import { useLocation } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner'

export default function Movie() {
  const [blogThumbnail, setBlogThumbnail] = useState([]);


  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [categoryName, setCategoryName] = useState();

  const fetchData = async () => {
    try {
      setIsLoading(false)




      const category = new URLSearchParams(window.location.search).get("category");
      const page = new URLSearchParams(window.location.search).get("page");
      let catParam = "";
      if (category && page) {
        catParam = '&category=' + category + '&page=' + page;
      } else if (category) {
        catParam = '&category=' + category;
      } else if (page) {
        catParam = '&page=' + page;
      }

      const blogPostURL = MOVIE_LIST + catParam;
      const blogs_response = await fetch(blogPostURL);
      const blog_result = await blogs_response.json();
      setBlogThumbnail(blog_result);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  // Calculate the total number of pages
  const totalPages = blogThumbnail?.total_pages;
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  // Function to handle page change
  const handlePageChange = (newPage, categoryName) => {
    setCurrentPage(newPage);
    //onPageChange(newPage);
    if (categoryName && newPage) {
      navigate(`/?category=${categoryName}&page=${newPage}`);
    } else if (newPage) {
      navigate(`/?page=${newPage}`);
    }

  };


  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category");
    const page = new URLSearchParams(window.location.search).get("page");
    let catParam = "";
    if (category && page) {
      catParam = '&category=' + category + '&page=' + page;
      setPageNumber(page);
    } else if (category) {
      catParam = '&category=' + category;
    } else if (page) {
      catParam = '&page=' + page;
      setPageNumber(page);
    }
    setCategoryName(category);
    setIsLoading(true)
    const blogPostURL = MOVIE_LIST + catParam;
    fetch(blogPostURL).then((res) => res.json()).then((data) => {
      setIsLoading(false)
      setBlogThumbnail(data);
    });


  }, [location])

  return (
    <div>

      <section className="section-spacing-y">
        <div className="container">
          <div className="gx-5 row">
            <div className="col-xl-12 order-1 order-xl-0">
              <div className="primary-section-heading mb_22 mt-5 mt-xl-0">
                Latest Movie
              </div>
              <div className="gx-5 row blog-custom-row">
                {
                  isLoading ?
                    <ColorRing
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={['#399e55', '#399e55', '#399e55', '#399e55', '#399e55']}
                    /> : blogThumbnail?.total_pages > 0 && blogThumbnail?.results ?
                      blogThumbnail['results']?.map((field, index) => (
                        <div className="col-lg-3 blog-custom-cols" key={index}>
                          <div className="blog-card">
                            <div className="img-box">
                              <img src={`https://image.tmdb.org/t/p/w500/${field.poster_path}`} alt={field.original_title} />

                            </div>
                            <div className="created-by">
                              <span>Release Date </span> |{" "}
                              <span>{field.release_date}</span>
                            </div>
                            <div className="card-heading">{field.original_title}</div>
                            <div className="card-desc">{field.overview}</div>
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
              {blogThumbnail?.total_pages > 1 &&
                <div className="pagination">
                  <ul className="paging">
                    {pageNumber > 1 &&
                      <li key='first' onClick={() => handlePageChange(parseInt(pageNumber) - 1, categoryName)} className={pageNumber + 1 == pageNumber ? 'btn btn-success active' : 'btn btn-danger'}>
                        Prev
                      </li>
                    }
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index} onClick={() => handlePageChange(index + 1, categoryName)} className={index + 1 == pageNumber ? 'btn btn-success active' : 'btn btn-danger'}>
                        {index + 1}
                      </li>
                    ))}
                    {blogThumbnail.total_pages != pageNumber &&
                      <li key='last' onClick={() => handlePageChange(parseInt(pageNumber) + 1, categoryName)} className={pageNumber + 1 == pageNumber ? 'btn btn-success active' : 'btn btn-danger'}>
                        Next
                      </li>
                    }
                  </ul>
                </div>
              }
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
