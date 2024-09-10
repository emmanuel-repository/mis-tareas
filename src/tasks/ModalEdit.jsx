import React, { useState, useEffect } from "react";

export function ModalEdit({ dataTask }) {


	const [formData, setFormData] = useState({ title: dataTask.title, description: dataTask.description });

	const handleSubmit = (event) => {
		event.preventDefault();

		const form = document.getElementById('form-edit');
		const formData = new FormData(form);
		const formObjetNormlizate = formDataToObject(formData)


		fetch(`${api}/create`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formObjetNormlizate)
		})
			.then((response) => response.json())
			.then((json) => {

				const result = json.body;

				console.log(result)

			})

	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};


	function formDataToObject(formData) {
		const normalizeValues = (values) => (values.length > 1) ? values : values[0];

		const formElemKeys = Array.from(formData.keys());

		return Object.fromEntries(
			// store array of values or single value for element key
			formElemKeys.map(key => [key, normalizeValues(formData.getAll(key))])
		);
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
						<form id="form-edit" className="row g-3" onSubmit={handleSubmit}>

							<div className="modal-body">


								<div className="col-md-12 mt-2">
									<label htmlFor="inputEmail4" className="form-label">Titulo:</label>
									<input type="text" className="form-control" name='title' id='title' value={formData.title} onChange={handleChange} />
								</div>

								<div className="col-md-12 mt-2">
									<label htmlFor="inputPassword4" className="form-label">Descripcion:</label>
									<input type="text" className="form-control" name='description' id='description' value={formData.description} onChange={handleChange} />
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