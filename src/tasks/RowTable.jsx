export function RowTable({ dataTask, editTask, deleteTask, updateStatus }) {


	return (
		<>
			<tr key={dataTask.slug}>
				<td>{dataTask.title}</td>
				<td>{dataTask.description}</td>
				<td>
					{(() => {
						if (dataTask.status == 'terminado') {
							return (
								<span className="status">
									<span className="status-circle green"></span>
									Terminado
								</span>
							)
						}

						if (dataTask.status == 'pendiente') {
							return (
								<span className="status">
									<span className="status-circle red"></span>
									Pendiente
								</span>
							)
						}
					})()}
				</td>
				<td>
					<button type="button" className="btn btn-xs btn-outline-info me-2 btn-sm" onClick={() => editTask(dataTask)}>
						Editar
					</button>
					<button type="button" className="btn btn-outline-light btn-sm  me-2" onClick={() => updateStatus(dataTask)}>
						Estatus
					</button>
					<button type="button" className="btn btn-outline-danger btn-sm" onClick={() => deleteTask(dataTask)}>
						Eliminar
					</button>
				</td>
			</tr>
		</>
	)

}