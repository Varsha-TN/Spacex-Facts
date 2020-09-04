import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/about'>About</NavLink></li>
         <li><NavLink to='/stats'> Stats </NavLink></li> 
        <li><a onClick={props.signOut}>Log Out</a></li>
        <li><a className="btn-floating  waves-effect waves-light pink lighten-1"> <i class="fa fa-rocket"></i></a>
       </li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
