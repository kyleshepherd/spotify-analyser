import React from 'react'

const LogoutButton = ({ clickHandler }) => {
	return (
		<div class="flex justify-center">
			<button
				className="my-8 block text-center bg-green-400 p-4 uppercase rounded-full font-semibold tracking-wider transition-colors duration-200 ease-in-out hover:bg-green-500"
				onClick={clickHandler}
			>
				Log Out
			</button>
		</div>
	)
}

export default LogoutButton
