import React from 'react'
import spotify from './apis/spotify'

export const authEndpoint = 'https://accounts.spotify.com/authorize'

const redirectUri = 'http://localhost:3000/callback'
const scopes = ['user-top-read']

const hash = window.location.hash
	.substring(1)
	.split('&')
	.reduce(function (initial, item) {
		if (item) {
			var parts = item.split('=')
			initial[parts[0]] = decodeURIComponent(parts[1])
		}
		return initial
	}, {})

window.location.hash = ''

class App extends React.Component {
	state = {
		token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
	}

	componentDidMount() {
		// Set token
		let _token = hash.access_token
		if (_token) {
			this.setState({ token: _token })
			localStorage.setItem('token', _token)
		}

		// Runs is user is auth'd
		if (this.state.token) {
			const userTopTracksResponse = spotify.get('/me/top/tracks', {
				headers: {
					Authorization: `Bearer ${this.state.token}`,
				},
			})
		}
	}

	render() {
		return (
			<div>
				{!this.state.token && (
					<a
						href={`${authEndpoint}?client_id=${
							process.env.REACT_APP_SPOTIFY_CLIENT_ID
						}&redirect_uri=${redirectUri}&scope=${scopes.join(
							'%20'
						)}&response_type=token&show_dialog=true`}
					>
						Login to Spotify
					</a>
				)}
				{this.state.token && <h1>LOGGED IN {this.state.token}</h1>}
			</div>
		)
	}
}

export default App
