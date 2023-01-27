import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';

function AppFooter() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
      window.addEventListener("scroll", () => {
          if (window.scrollY > 400) {
              setShowTopBtn(true);
          } else {
              setShowTopBtn(false);
          }
      });
  }, []);

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <Container fluid>
      <div className="copyright">&copy; 2022 AGCS IT Solutions. All Right Reserved.</div>
      <div className="socials">
        <ul>
          <li><a href="https://www.facebook.com"><i className="fab fa-facebook-f"></i></a></li>
          <li><a href="https://www.twitter.com"><i className="fab fa-twitter"></i></a></li>
          <li><a href="https://www.linkedin.com"><i className="fab fa-linkedin-in"></i></a></li>
        </ul>
      </div>
      {
        showTopBtn && (
          <div className="go-top" onClick={goTop}></div>
        )
      }


    </Container>
  )
}

// Chat API 
// var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6349f74b54f06e12d89a4297/1gfces0gl';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
// Chat API

export default AppFooter;