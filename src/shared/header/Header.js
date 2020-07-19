import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

const Header = (props) => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography
					style={{
						flexGrow: 1
					}}
					variant="h6"
				>
					<Link to="/">
						<HomeIcon />
					</Link>
				</Typography>
				{props.user && <span>{props.user.userName}</span>}
				{props.user && (
					<span>
						<Button onClick={props.onLogout} color="inherit">
							Logout
						</Button>
					</span>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
