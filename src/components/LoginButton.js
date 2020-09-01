import React from 'react'

const LoginButton = ({ authEndpoint, redirectUri, scopes }) => {
	return (
		<div className="absolute abs-center">
			<h1 className="text-center font-semibold mb-4 text-lg">
				Login to view your Spotify stats
			</h1>
			<a
				className="block text-center bg-green-400 p-4 uppercase rounded-full font-semibold tracking-wider transition-colors duration-200 ease-in-out hover:bg-green-500"
				href={`${authEndpoint}?client_id=${
					process.env.REACT_APP_SPOTIFY_CLIENT_ID
				}&redirect_uri=${redirectUri}&scope=${scopes.join(
					'%20'
				)}&response_type=token&show_dialog=true`}
			>
				Login to Spotify
			</a>
		</div>
	)
}

export default LoginButton
