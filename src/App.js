import React, { useState, useEffect } from 'react'
import spotify from './apis/spotify'
import LoginButton from './components/LoginButton'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import Stats from './components/Stats'

export const authEndpoint = 'https://accounts.spotify.com/authorize'

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
	const [topTracks, setTopTracks] = useState([])
	const [analysedTracks, setAnalysedTracks] = useState([])
	const [stats, setStats] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const _token = hash.access_token

		if (_token) {
			setToken(_token)
			sessionStorage.setItem('token', _token)
		}

		if (token !== null) {
			setLoading(true)
			getTopTracks()
		}
	}, [token])

	const getTopTracks = async () => {
		spotify
			.get('/me/top/tracks', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					time_range: 'medium_term',
					limit: 50,
				},
			})
			.then(response => {
				const tracks = []

				response.data.items.forEach(track => {
					tracks.push(track.id)
				})

				setTopTracks(tracks)
			})
			.catch(error => {
				setToken(null)
				sessionStorage.setItem('token', null)
				setLoading(false)
			})
	}

	useEffect(() => {
		const analyseTracks = async () => {
			if (topTracks.length > 0) {
				const trackAnalysis = await spotify.get('/audio-features/', {
					params: {
						ids: topTracks.join(','),
					},
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})

				setAnalysedTracks(trackAnalysis.data.audio_features)
			}
		}

		analyseTracks()
	}, [topTracks])

	useEffect(() => {
		const buildStats = () => {
			if (analysedTracks.length > 0) {
				const _stats = {
					acousticness: calcAverageStat('acousticness'),
					danceability: calcAverageStat('danceability'),
					energy: calcAverageStat('energy'),
					instrumentalness: calcAverageStat('instrumentalness'),
					valence: calcAverageStat('valence'),
				}

				setStats(_stats)
				setLoading(false)
			}
		}

		buildStats()
	}, [analysedTracks])

	const calcAverageStat = stat => {
		let statTotal = 0

		analysedTracks.forEach(track => {
			statTotal += track[stat]
		})

		return Math.round((statTotal / analysedTracks.length) * 1000) / 100
	}

	return (
		<div className="text-white font-body bg-pink-300 py-2 px-4">
			<>
				<h1 className="font-black uppercase text-4xl tracking-widest italic text-center mb-8">
					Statify
				</h1>

				{!token && (
					<LoginButton
						authEndpoint={authEndpoint}
						redirectUri={process.env.REACT_APP_REDIRECT_URI}
						scopes={scopes}
					/>
				)}
				{token && (
					<>
						{loading ? (
							<LoadingSpinner />
						) : (
							<>
								{stats !== null && Object.keys(stats).length > 0 ? (
									<Stats stats={stats} />
								) : null}
							</>
						)}
					</>
				)}

				<Footer />
			</>
		</div>
	)
}

export default App
