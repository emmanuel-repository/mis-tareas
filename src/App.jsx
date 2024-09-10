import { TableTask } from './tasks/TableTask'
import React, { useState, useEffect } from "react";
import './App.scss'

function App() {

  const api = 'http://localhost:4000/api/my-tasks';
  const videoSrc = "https://assets.codepen.io/3364143/7btrrd.mp4";
  const [formData, setFormData] = useState({ title: "", description: "", slug: "" });
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {

    getListTasks();

    function getListTasks() {
      fetch(api).then((response) => response.json()).then((json) => {
        setTasks(json.body);
      });
    }

  }, []);

  const handleSubmitSave = (event) => {

    event.preventDefault();

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

      })
  };

  const handleSubmitEdit = (event) => {

    event.preventDefault();

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

        setTasks(newList)
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
    console.log(data)
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
              <div className="content-wrapper">

                <div className="content-section">

                  <div className="content-section-title">
                    <h2>Mis tareas</h2>
                  </div>

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
