import React, { useState, useEffect } from "react";

export function ModalEdit({ dataTask, headlenSetInputs}) {

	const [tast, setTasks] = useState([])
	
	headlenSetInputs = () => { 
		setTasks(dataTask)
	}

	const handleInput = (e) => {
        e.persist();
        setTasks({...tast, [e.target.name]: e.target.value });
    }

	return (
		<>
			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">Editar Tarea</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<form id="form-edit" className="row g-3">

							<div className="modal-body">


								<div className="col-md-12 mt-2">
									<label htmlFor="inputEmail4" className="form-label">Titulo:</label>
									<input type="text" className="form-control" name='title' id='title'  onChange={handleInput} value={tast.title} />
								</div>

								<div className="col-md-12 mt-2">
									<label htmlFor="inputPassword4" className="form-label">Descripcion:</label>
									<input type="text" className="form-control" name='description' id='description' />
								</div>
							</div>

							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
								<button type="submit" className="btn btn-primary">Send message</button>
							</div>

						</form>

					</div>
				</div>
			</div>
		</>
	)
}