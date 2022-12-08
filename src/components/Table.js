import Link from 'next/link'
import React from 'react'

const Table = ({ data, headers, database }) => {
	return (
		<>
			<div className='w-full flex-col items-center'>
				<div className='w-full text-center'>
					<div>
						<div className='grid grid-cols-4 font-bold py-3 border-b-2'>
							{
								headers.map((header) => {
									return <div key={header.value}>{header.label}</div>
								})
							}
						</div>
					</div>
					<div className='text-center grid grid-cols-1'>
						{
							data.map((item) => {
								return <Link href={`${database}/${item.id}`} key={item.email} className="grid grid-cols-4 py-3 border-b">
									{
										Object.values(item).map((itemData) => {
											return <div key={itemData}>{itemData}</div>
										})
									}
								</Link>
							})
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default Table