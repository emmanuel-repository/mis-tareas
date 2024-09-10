import React, { useState, useEffect, useContext } from "react"
import { RowTable } from "./RowTable"


export function TableTask({ tasks, handleSendData, hundleDeleteTask, hundleUpdateStatus }) {

	const editTask = (data) => { handleSendData(data); }
	
	const delateTask = (data) => { hundleDeleteTask(data) }

	const updateStatus = (data) => { hundleUpdateStatus(data) }

	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th>Titulo</th>
						<th>Descripcion</th>
						<th>Estatus</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>

					{tasks.map((dataTask) => (
						<RowTable dataTask={dataTask} editTask={editTask} deleteTask={delateTask} updateStatus={updateStatus}/>
					))}

				</tbody>
			</table>

		</>
	)

}


