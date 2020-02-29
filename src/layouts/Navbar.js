import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
          <a className="navbar-brand" href="/">
            Widget Editor
          </a>
        </nav>
      </header>
    );
  }
}

export default Navbar;
