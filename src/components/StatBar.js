import React from 'react'

const StatBar = ({ name, stat, leftSvg, rightSvg }) => {
	return (
		<div>
			<div className="flex items-end mb-6">
				<div className="w-10">{leftSvg}</div>
				<div className="flex-1 mx-4">
					<h2 className="font-bold italic tracking-wider text-center uppercase mb-1">
						{name}
					</h2>
					<div
						className="bg-white h-6"
						style={{ width: `${stat * 10}%` }}
					></div>
				</div>
				<div className="w-10">{rightSvg}</div>
			</div>
		</div>
	)
}

export default StatBar
