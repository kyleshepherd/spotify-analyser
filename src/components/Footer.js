import React from 'react'

const Footer = () => {
	return (
		<div className="bg-pink-300 p-2 absolute left-0 bottom-0 w-full">
			<div className="text-center">
				Created by{' '}
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://kyleshepherd.co.uk"
				>
					<span className="font-bold hover:text-green-600 transition-colors duration-200 ease-in-out">
						Kyle Shepherd
					</span>
				</a>
			</div>
		</div>
	)
}

export default Footer
