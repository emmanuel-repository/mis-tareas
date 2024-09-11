import { TableTask } from './tasks/TableTask'
import React, { useState, useEffect } from "react";
import './App.scss'

function App() {

  const api = 'http://localhost:4000/api/my-tasks';
  const videoSrc = "https://assets.codepen.io/3364143/7btrrd.mp4";
  const [formData, setFormData] = useState({ title: "", description: "", slug: "" });
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const [errorForm, setError] = useState([]);

  useEffect(() => {

    getListTasks();

    function getListTasks() {
      fetch(api).then((response) => response.json()).then((json) => {
        setTasks(json.body);
      });

      const myArray = [5, 2, 5, 7, 2, 4, 5];
     
      const count = myArray.reduce(
        (acc, val) => (
          (acc[val] = (acc[val] || 0) + 1) > acc.maxCount &&  (acc.maxCount = acc[val]) && (acc.maxNum = val),
          acc
        ), { maxNum: null, maxCount: 0 }
      )
      //Valor más repetido
      console.log(`El número más repetido es: ${count.maxNum} con: ${count.maxCount} repeticiones`)
      //Conteo en general
      console.log('El arreglo es:', myArray)
    }

  }, []);

  const handleSubmitSave = (event) => {

    event.preventDefault();

    const isValid = valiteForm(formData);

    if (isValid.length != 0) return;

    fetch(`${api}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .catch(function (error) {

        console.log(error)
        return;

      }).then((json) => {
        const result = json.body;

        setTasks((tasks) => [...tasks, result]);
        setIsEdit(false)
        setError([])

      })
  };

  const handleSubmitEdit = (event) => {

    event.preventDefault();

    const isValid = valiteForm(formData);

    if (isValid.length != 0) return;

    fetch(`${api}/update/${formData.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .catch(function (error) {

        console.log(error)
        return;

      }).then((json) => {
        const result = json.body;

        let tempArray = [...tasks];

        const newList = tempArray.map((el) => {
          if (el.slug === result.slug) { return result; }
          return el;
        });

        setTasks(newList);
      });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSendData = (data) => {
    setIsEdit(true);
    setFormData(data);
  }

  const hundleDeleteTask = (data) => {

    fetch(`${api}/delete-task/${data.slug}`, { method: 'DELETE' }).catch(function (error) {

      console.log(error)
      return;

    }).then((response) => response.json())
      .then((json) => {

        const slug = json.body;
        let tempArray = [...tasks];

        const newList = tempArray.filter((value) => value.slug !== slug);

        setTasks(newList);
      })

  }

  const hundleUpdateStatus = (data) => {

    fetch(`${api}/update-status/${data.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .catch(function (error) {

        console.log(error)
        return;

      }).then((json) => {

        const result = json.body;

        let tempArray = [...tasks];

        const newList = tempArray.map((el) => {
          if (el.slug === result.slug) { return result; }
          return el;
        });

        setTasks(newList);

      });
  }

  const valiteForm = (dataForm) => {

    const error = [];
    const notValid = [undefined, null, ''];

    if (notValid.includes(dataForm.title)) error.push({ message: 'El  Titulo es requerido' });

    if (notValid.includes(dataForm.description)) error.push({ message: 'La Descripcion es requerido' });

    setError(error);
    return error;

  }

  const cancel = () => {
    setIsEdit(false)
    setFormData({ title: "", description: "", slug: "" })
  }

  return (
    <>
      <div className="container">

        <div className="video-bg">
          <video width="320" height="240" autoPlay loop muted>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="app">

          {/* <ModalEdit dataTask={taskEdit} headlenSetInputs={headlenSetInputs}/> */}

          <div className="wrapper">

            <div className="main-container">

              <div className="main-header">
                <a className="menu-link-main" href="#"><h2 className='pt-2'>Mis tareas</h2></a>
              </div>

              <div className="content-wrapper">

                <div className="content-section">

                  <div className="apps-card">
                    <div className="app-card">

                      <div className="row mb-3">
                        <span> {isEdit ? "Editar Tarea" : "Agregar nueva Tarea"} </span>
                      </div>

                      <form className="row g-3" onSubmit={isEdit ? handleSubmitEdit : handleSubmitSave}>

                        <div className="col-md-6 mt-2">
                          <label htmlFor="inputEmail4" className="form-label">Titulo:</label>
                          <input type="text" className="form-control" name='title' id='title' value={formData.title} onChange={handleChange} />
                        </div>

                        <div className="col-md-6 mt-2">
                          <label htmlFor="inputPassword4" className="form-label">Descripcion:</label>
                          <input type="text" className="form-control" name='description' id='description' value={formData.description} onChange={handleChange} />
                        </div>

                        <div className="col-sm-12 d-flex justify-content-end">
                          <div className="app-card-buttons">
                            <button type="submit" className="content-button status-button mr-2">{isEdit ? "Editar" : "Guardar"}</button>

                            {(() => {

                              if (isEdit) {
                                return (
                                  <>
                                    <button className="content-button status-button open" onClick={() => { cancel() }}>Cancelar</button>
                                  </>
                                )
                              }

                            })()}
                          </div>
                        </div>

                      </form>

                      <div className="row">
                        {
                          errorForm.map((error) => {
                            return (
                              <>
                                <div className="col-sm-12 text-danger">
                                  {error.message}
                                </div>
                              </>
                            )
                          })
                        }
                      </div>

                    </div>
                  </div>

                  <div className="apps-card mt-5">
                    <div className="app-card">

                      <div className="col-sm-12 mt-2">
                        <TableTask tasks={tasks} handleSendData={handleSendData} hundleDeleteTask={hundleDeleteTask} hundleUpdateStatus={hundleUpdateStatus} />
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default App
