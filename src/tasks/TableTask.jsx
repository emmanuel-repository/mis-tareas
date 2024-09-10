import React, { useState, useEffect, useContext } from "react"
import { RowTable } from "./RowTable"


export function TableTask({ tasks, handleSendData }) {

	const editTask = (data) => {
		handleSendData(data);
	}

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
						<RowTable dataTask={dataTask} editTask={editTask} />
					))}

				</tbody>
			</table>

		</>
	)

}


