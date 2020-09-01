import React from 'react'

const StatBar = ({ name, stat }) => {
	return (
		<div>
			<div className="flex items-end mb-8">
				<div className="font-bold italic tracking-wider text-center uppercase">
					0
				</div>
				<div className="flex-1 mx-4 relative">
					<h2 className="font-bold italic tracking-wider text-center uppercase mb-1">
						{name}
					</h2>
					<div
						className="bg-white h-6"
						style={{ width: `${stat * 10}%` }}
					></div>
					<span
						className="absolute top-full"
						style={{ left: `${stat * 10 - 2}%` }}
					>
						{stat}
					</span>
				</div>
				<div className="font-bold italic tracking-wider text-center uppercase">
					10
				</div>
			</div>
		</div>
	)
}

export default StatBar
