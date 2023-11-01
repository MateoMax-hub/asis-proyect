import { useEffect, useState } from 'react'
import './App.css'
import { Button, Checkbox, Modal, Table } from 'antd'
import './style.scss'

function App() {
  const students = [
    {key: 1, student: 'Mateo Gabriel Max', classes: []},
    {key: 2, student: 'Valentina	Acosta', classes: []},
    {key: 3, student: 'Bruno	Alarcon', classes: []},
    {key: 4, student: 'Roberto	Arebalo', classes: []},
    {key: 5, student: 'Natalia Elizabeth	Arganaraz', classes: []},
    {key: 6, student: 'Pablo Ignacio	Avellaneda', classes: []},
    {key: 7, student: 'Lisandro	Civili de la Vega', classes: []},
    {key: 8, student: 'Bruno Nahuel	Cordoba', classes: []},
    {key: 9, student: 'Juan Matias	Cruz', classes: []},
    {key: 10, student: 'Ramiro Walter	Diaz Vaca', classes: []},
    {key: 11, student: 'Fernando Gastón	Figueroa', classes: []},
    {key: 12, student: 'Valentina	Fresia', classes: []},
    {key: 13, student: 'Valentina	Fuentes', classes: []},
    {key: 14, student: 'Nicolas	Grosso', classes: []},
    {key: 15, student: 'Maia Federica	Gutierrez', classes: []},
    {key: 16, student: 'Jorge	Herrera', classes: []},
    {key: 17, student: 'Franco Adrian	Inigo Montoya', classes: []},
    {key: 18, student: 'Maria Belen	Molina', classes: []},
    {key: 19, student: 'Mariela	Nabia', classes: []},
    {key: 20, student: 'Cynthia	Ortiz', classes: []},
    {key: 21, student: 'Victor Ariel	Posse', classes: []},
    {key: 22, student: 'Federico	Revollo', classes: []},
    {key: 23, student: 'Justina	Robinson', classes: []},
    {key: 24, student: 'Nadia	Rodriguez Perea', classes: []},
    {key: 25, student: 'Francisco	Romano', classes: []},
    {key: 26, student: 'Franco Mauricio	Sanchez', classes: []},
    {key: 27, student: 'Julio Gerardo	Sanchez', classes: []},
    {key: 28, student: 'Maximiliano	Soriano', classes: []},
    {key: 29, student: 'Maria Carolina	Valverde Vasile', classes: []},
    {key: 30, student: 'Elias Gustavo	Vargas', classes: []},
    {key: 31, student: 'Joaquin	Vazquez Garcia', classes: []},
    {key: 32, student: 'Santiago Valentin	Zelada Campos', classes: []},
    {key: 33, student: 'Pablo	Lopez sardi', classes: []},
  ]
  const [studentsAsis, setStudentsAsis] = useState([])
  const [classModalOpen, setClassModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('')
  
  useEffect(() => {
    if (!studentsAsis.length) {
      const asisLocal = JSON.parse(localStorage.getItem('asis'))
      if (asisLocal) return setStudentsAsis(asisLocal)
      setStudentsAsis(students)
      return 
    }
    localStorage.setItem('asis', JSON.stringify(studentsAsis))
  }, [studentsAsis])

  const handleNewClass = () => {
    setStudentsAsis(previous => {
      const date = (new Date()).toLocaleDateString()
      const classExists = previous.some((student) => {
        const studentClass = student.classes.some((cl) => cl?.date === date)
        return studentClass
      })
      if (classExists) return previous
      const classAdded = previous.map((student) => ({
        ...student,
        classes: [...student.classes, {date, present: false, auto: false}]
      }))
      return classAdded
    })
  }

  const redirectToClass = (classs) => {
    setSelectedClass(classs)
    setClassModalOpen(true)
  }

  const getChecked = (row, checkbox) => {
    const classFound = row.classes.find((cl) => cl.date === (new Date()).toLocaleDateString())
    return classFound[checkbox]
  }

  const handleCheck = (checked, row, checkbox) => {
    setStudentsAsis(previous => {
      return previous.map((student) => {

        if (student.student !== row.student) return student
        const classUpdated = student.classes.map((cl) => {
          if (cl.date !== (new Date().toLocaleDateString())) return cl
          return {...cl, [checkbox]: checked}
        })
        return {...student, classes: classUpdated}
      })
    })
  }

  return ( 
    <div className='w-100 h-100 d-flex flex-wrap justify-content-around'>
      {
        studentsAsis.length && studentsAsis[0].classes.map((classs) => (
          <Button
            className='mt-3'
            key={classs.date}
            onClick={() => redirectToClass(classs.date)}
          >
            {classs.date}
          </Button>
        ))
      }
      <Button className='mt-3' onClick={handleNewClass}>new class</Button>
      {classModalOpen && (
        <Modal
          open={classModalOpen}
          onCancel={() => setClassModalOpen(false)}
          footer={false}
          title={selectedClass}
          width={800}
        >
          <Table
            dataSource={studentsAsis}
            columns={[
              {
                title: 'name',
                dataIndex: 'student',
              },
              {
                title: 'present',
                render: (row) => (
                  <Checkbox
                    defaultChecked={getChecked(row, 'present')}
                    onChange={(a) => handleCheck(a.target.checked, row, 'present')}
                  />
                )
              },
              {
                title: 'auto',
                render: (row) => (
                  <Checkbox
                    defaultChecked={getChecked(row, 'auto')}
                    onChange={(a) => handleCheck(a.target.checked, row, 'auto')}
                  />
                )
              },
            ]}
          />
        </Modal>
      )}
    </div>
  )
}

export default App
