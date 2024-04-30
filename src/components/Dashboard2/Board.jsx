import { Card, CardFooter, Typography, CardBody, CardHeader, Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Board = () => {
	// Example data. Replace this with actual data fetching logic.
	const boards = {
		"Board1": { "boardID": 1231 },
		"Board2": { "boardID": 1232 },
		"Board3": { "boardID": 1233 },
		// Add more boards as needed
	};

	const handleBoard = () => {
		Object.keys(boards).push({"Board3": { "boardID": 1234 }})
	}
	return (
		<div className='m-10'>
			<h2 className='text-4xl'>Boards</h2>
			<Button onClick={handleBoard}>Add Button</Button>
			<ul className='flex flex-row gap-4'>
				{Object.keys(boards).map((boardId, index) => (
					<Card key={index} className="mt-6 w-80">
						{/* {console.log(boardId)}  */}

						<CardBody>
							<Typography variant="h5" color="blue-gray" className="mb-2">
								{boardId}
							</Typography>

							<Typography>
								Board description
							</Typography>
						</CardBody>
						<CardFooter className="pt-0">
							<Link to={`/dashboard/board/todoboards/${boards[boardId].boardID}`}>
								<Button ripple={true} color="blue">
									{boardId}

								</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</ul>
		</div>
	);
};

export default Board;
