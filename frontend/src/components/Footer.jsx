// import React from "react";

// function Footer() {
//   return (
//     <>
//         <footer className="footer bg-dark text-light py-4 position-relative bottom-0">
//           <div className="container text-center">
//               <p className="mb-1">&copy; 2024 ComicShelf. All rights reserved</p>
//               <p className="mb-3 fs-7">Made with ❤️ by AS</p>
//           </div>
//         </footer>
//     </>
//   );
// }

// export default Footer;


import React from "react";

function Footer() {
  return (
    <>
      <footer className="footer bg-dark text-light py-4 position-relative bottom-0">
        <div className="container text-center">
          <p className="mb-1">&copy; {new Date().getFullYear()} AlumniConnect. All rights reserved.</p>
          <p className="mb-2 fs-7">Made with ❤️</p>
          <div className="d-flex justify-content-center gap-3">
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
