// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { logout } from "../../actions/auth";

// export class Header extends Component {
//   static propTypes = {
//     auth: PropTypes.object.isRequired,
//     logout: PropTypes.func.isRequired,
//   };
//   render() {
//     const { isAuthenticated, user } = this.props.auth;
//     const guestLinks = (
//       <React.Fragment>
//         <li className="nav-item">
//           <Link to="/register" className="nav-link">
//             Register
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/login" className="nav-link">
//             Login
//           </Link>
//         </li>
//       </React.Fragment>
//     );

//     const authLinks = user && (
//       <ul className="navbar-nav ml-auto d-flex flex-row">
//         <li className="nav-item text-light">
//           <small>Hello,</small>
//           <br /> {user.username}
//         </li>
//         <li className="nav-item">
//           <button
//             onClick={this.props.logout}
//             className="nav-link btn btn-info btn-sm text-light"
//           >
//             Logout
//           </button>
//         </li>
//       </ul>
//     );

//     return (
//       <header>
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//           <Link to="/" className="navbar-brand">
//             Leads Manager <span className="sr-only">(current)</span>
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarColor02"
//             aria-controls="navbarColor02"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarColor02">
//             <ul className="navbar-nav mr-5">
//               {!isAuthenticated && guestLinks}
//               <li className="nav-item">
//                 <a className="nav-link" href="/">
//                   About
//                 </a>
//               </li>
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   data-toggle="dropdown"
//                   href="/"
//                   role="button"
//                   aria-haspopup="true"
//                   aria-expanded="false"
//                 >
//                   Dropdown
//                 </a>
//                 <div className="dropdown-menu">
//                   <a className="dropdown-item" href="/">
//                     Action
//                   </a>
//                   <a className="dropdown-item" href="/">
//                     Another action
//                   </a>
//                   <a className="dropdown-item" href="/">
//                     Something else here
//                   </a>
//                   <div className="dropdown-divider"></div>
//                   <a className="dropdown-item" href="/">
//                     Separated link
//                   </a>
//                 </div>
//               </li>
//             </ul>
//             <form className="form-inline my-2 my-lg-0">
//               <input
//                 className="form-control mr-sm-2"
//                 type="text"
//                 placeholder="Search"
//               />
//               <button className="btn btn-secondary my-2 my-sm-0" type="submit">
//                 Search
//               </button>
//             </form>
//           </div>
//           <div className="ml-auto">{isAuthenticated && user && authLinks}</div>
//         </nav>
//       </header>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });
// export default connect(mapStateToProps, { logout })(Header);
