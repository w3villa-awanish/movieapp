import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import playStore from "../../assets/images/google-play.png";
import appStore from "../../assets/images/apple-store.png";
import mailIcon from "../../assets/images/mailIcon.png";
import phoneIcon from "../../assets/images/phoneIcon.png";
import fbIcon from "../../assets/images/icons/facebookIcon.svg";
import instaIcon from "../../assets/images/icons/instaIcon.svg";
import linkedIcon from "../../assets/images/icons/linkedinIcon.svg";
import youtubeIcon from "../../assets/images/icons/youtubeIcon.svg";

function Footer() {

  return (
    <>
      <section className="footer-area p-100">
        <div className="container pt-5">
          <div className="row justify-content-between">
            <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 footer-box-item">
              <div className="footer-logo">
                <img src={logo} alt="logo" />
              </div>
              <div className="footer-about footer-list">
                <div className="footer-desc">
                  Download the app and experience app, where enjoy fun and savings!
                </div>
                <div className="d-flex store-btn-parent mt-3">
                  <Link
                    className="btn-parent"
                    to="#"
                  >
                    <img src={playStore} alt="Download" />
                  </Link>
                  <Link className="btn-parent" to="#">
                    <img src={appStore} alt="download" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12">
              <div className="footer-description p-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                <br></br><br></br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </div>
            </div>
            <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 footer-box-item-parent">
              <div className="row justify-content-between">

                <div className="col-lg-12 col-md-12 col-sm-12 footer-box-item">
                  <div className="footer-list">
                    <div className="title">Follow us</div>
                    <div className="footer-contact-info">
                      <ul className="footer-social-icon d-flex p-0">
                        <li>
                          <a
                            href="{#}"
                            target="_blank"
                            rel="noreferrer"
                            className="social-icon"
                          >
                            <img src={fbIcon} alt="" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="/twitter"
                            target="_blank"
                            rel="noreferrer"
                            className="social-icon"
                          >
                            <img src={linkedIcon} alt="" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="{#}"
                            target="_blank"
                            rel="noreferrer"
                            className="social-icon"
                          >
                            <img src={instaIcon} alt="" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="{#}"
                            target="_blank"
                            rel="noreferrer"
                            className="social-icon"
                          >
                            <img src={youtubeIcon} alt="" />
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="title">Contact us</div>
                    <div className="footer-contact-info">
                      <ul className="footer-contact-list p-0">
                        <li>
                          <img src={mailIcon} alt="" />
                          contact@movieapp.com
                        </li>
                        <li>
                          <img src={phoneIcon} alt="" />
                          +9123456789
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="copyright-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="text-center copyright-text">
              Copyright Info © 2024 Movieapp. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
