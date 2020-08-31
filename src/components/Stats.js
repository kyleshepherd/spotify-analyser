import React from 'react'
import StatBar from './StatBar'
import { ReactComponent as Acoustic } from '../svg/acoustic.svg'
import { ReactComponent as Drum } from '../svg/drum.svg'

const Stats = ({ stats }) => {
	return (
		<div className="mx-auto max-w-2xl">
			<StatBar
				name="Acousticness"
				stat={stats.acousticness}
				leftSvg={<Drum />}
				rightSvg={<Acoustic />}
			/>
			<StatBar
				name="Danceability"
				stat={stats.danceability}
				leftSvg={<Drum />}
				rightSvg={<Acoustic />}
			/>
			<StatBar
				name="Energy"
				stat={stats.energy}
				leftSvg={<Drum />}
				rightSvg={<Acoustic />}
			/>
			<StatBar
				name="Instrumentalness"
				stat={stats.instrumentalness}
				leftSvg={<Drum />}
				rightSvg={<Acoustic />}
			/>
			<StatBar
				name="Valence"
				stat={stats.valence}
				leftSvg={<Drum />}
				rightSvg={<Acoustic />}
			/>
		</div>
	)
}

export default Stats
