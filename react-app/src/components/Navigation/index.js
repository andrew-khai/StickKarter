import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import useWindowWidth from '../../hooks/windowWidth';
import { BiWorld } from "react-icons/bi";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const width = useWindowWidth();

	return (
		<div id='nav-container'>
			<div id="leftside-nav">
				<NavLink id="discover-link" exact to="/discover">
				{width <= 768 ? <BiWorld size={25}/> : "Discover"}
				</NavLink>
				{sessionUser && width >= 640 &&
					<div>
						<NavLink id="start-a-project" exact to="/projects/new">Start a project</NavLink>
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
