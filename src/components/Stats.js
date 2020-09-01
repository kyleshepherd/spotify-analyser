import React from 'react'
import StatBar from './StatBar'

const Stats = ({ stats }) => {
	return (
		<div className="mx-auto max-w-2xl">
			<h2 className="text-center font-bold uppercase italic tracking-wider text-xl mb-4">
				Your Spotify stats:
			</h2>
			<div className="p-4 border-white rounded-lg border">
				<StatBar name="Acousticness" stat={stats.acousticness} />
				<StatBar name="Danceability" stat={stats.danceability} />
				<StatBar name="Energy" stat={stats.energy} />
				<StatBar name="Instrumentalness" stat={stats.instrumentalness} />
				<StatBar name="Positivity" stat={stats.valence} />
			</div>
		</div>
	)
}

export default Stats
