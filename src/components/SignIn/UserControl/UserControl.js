import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import styles from "./UserControl.module.scss";
import axios from "axios";

class UserControl extends Component {
  signOutHandler = (event) => {
    event.preventDefault();

    axios
      .delete("http://funny-movies-api.test/sign_out")
      .then((response) => {
        console.log(response);
        this.props.onSignOut();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  render() {
    const { userName } = this.props;

    return (
      <Fragment>
        <div className={styles.Welcome}>{`Welcome ${userName}`}</div>
        <button>
          <a href="/share">Share a movie</a>
        </button>
        <button type="submit" onClick={this.signOutHandler}>
          Logout
        </button>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.currentUser.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => dispatch({ type: "SIGN_OUT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserControl);
