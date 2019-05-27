import React from 'react'
import Authorization from '../authorization'
import TasksList from '../tasks-list'
import TaskForm from '../task-form'
import './styles.scss'

function Main() {
  return (
    <div>
      <Authorization />
      <div className="main-wrapper">
        <TasksList />
        <TaskForm />
      </div>
    </div>
  );
}

export default Main
