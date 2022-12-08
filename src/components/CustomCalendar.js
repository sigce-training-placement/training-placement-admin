import React from 'react'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({ onChange, value, className, showCalendar }) => {
	return (
		<>
			<div className={showCalendar ? 'h-max w-max absolute top-0 left-0' : "hidden"}>
				<Calendar className={"rounded-lg"} onChange={onChange} value={new Date(Number(value.split("-")[0]), Number(value.split("-")[1] - 1), Number(value.split("-")[2]))} />
			</div>
		</>
	)
}

export default CustomCalendar