import React, { Component } from 'react';

export default class Error404 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="msg">
        <h1>404 Unknown</h1>
        <a href="/">Return to movie listing</a>
      </div>
    );
  }
}