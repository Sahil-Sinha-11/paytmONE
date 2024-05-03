import axios from 'axios';


const apiCall= () =>{
  axios.get('http://localhost:8080').then((data) =>{
  console.log(data)
})
}



function App() {

  return (
    <div>
        Hello world
    </div>
  )
}

export default App
