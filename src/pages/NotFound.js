import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NotFound extends Component {
  render() {
    return (
      <div id="nf">
        <h2>Sorry!</h2>
        <p> Page not found </p>
        <Link id="nf-link" to="/">
          {' '}
          Back to homepage...{' '}
        </Link>
      </div>
    );
  }
}

export default NotFound;
