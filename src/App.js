import React, { useState, useEffect } from 'react'
import spotify from './apis/spotify'
import LoginButton from './components/LoginButton'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import Stats from './components/Stats'

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
				},
			})
			.then(response => {
				setTopTracks(response.data.items)
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
				const analysed = []

				for (const track of topTracks) {
					const analysedTrack = await analyseTrack(track)
					analysed.push(analysedTrack)
				}

				setAnalysedTracks(analysed)
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

	const analyseTrack = async track => {
		const trackAnalysis = await spotify.get(`/audio-features/${track.id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return trackAnalysis.data
	}

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
						redirectUri={redirectUri}
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
