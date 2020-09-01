import React from 'react'

const LoadingSpinner = () => {
	return (
		<div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-75">
			<div className="absolute abs-center">
				<div className="loading-spinner border-4 w-24 h-24 border-green-400 rounded-full"></div>
			</div>
		</div>
	)
}

export default LoadingSpinner
