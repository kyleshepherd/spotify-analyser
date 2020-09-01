import React from 'react'
import StatBar from './StatBar'
import { ReactComponent as Acoustic } from '../svg/acoustic.svg'
import { ReactComponent as Drum } from '../svg/drum.svg'

const Stats = ({ stats }) => {
	return (
		<div className="mx-auto max-w-2xl">
			<StatBar name="Acousticness" stat={stats.acousticness} />
			<StatBar name="Danceability" stat={stats.danceability} />
			<StatBar name="Energy" stat={stats.energy} />
			<StatBar name="Instrumentalness" stat={stats.instrumentalness} />
			<StatBar name="Positivity" stat={stats.valence} />
		</div>
	)
}

export default Stats
