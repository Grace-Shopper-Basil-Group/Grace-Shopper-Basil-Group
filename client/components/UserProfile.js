import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../store/users';

export class UserProfile extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    let user = this.props.user || {};

    return (
      <div>
        <div>
          <h1> User Profile</h1>
        </div>
        <div>
          <div key={user.id}>
            <div>{`${user.firstName + ' ' + user.lastName}`}</div>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{user.accessRights}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.users[0] };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(fetchSingleUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
