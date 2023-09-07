import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div id='nav-container'>
			<div id="leftside-nav">
				<NavLink exact to="/">Discover</NavLink>
				{sessionUser &&
					<div>
						<NavLink exact to="/">Start a project</NavLink>
					</div>
				}
			</div>
			<div>
				<NavLink exact to="/"><h1 id='nav-logo'>StickKarter</h1></NavLink>
			</div>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
