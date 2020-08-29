import React, { useState, useEffect } from 'react'
import spotify from './apis/spotify'

export const authEndpoint = 'https://accounts.spotify.com/authorize'

const redirectUri = 'http://localhost:3000/'
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

const App = () => {
	const [token, setToken] = useState(sessionStorage.getItem('token') || null)
	const [topTracks, setTopTracks] = useState(null)

	useEffect(() => {
		const _token = hash.access_token

		if (_token) {
			setToken(_token)
			sessionStorage.setItem('token', _token)
		}

		if (token) {
			getTopTracks()
		}
	}, [token])

	const getTopTracks = async () => {
		const { data } = await spotify.get('/me/top/tracks', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				time_range: 'medium_term',
			},
		})

		setTopTracks(data.items)
	}

	return (
		<div>
			{!token && (
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
			{token && <h1>LOGGED IN {token}</h1>}
		</div>
	)
}

export default App
