import React from 'react';
import UsersList from '../users-list'
import Authorization from '../authorization'

function Main() {
  return (
    <div>
      <Authorization />
      <UsersList />
    </div>
  );
}

export default Main;
