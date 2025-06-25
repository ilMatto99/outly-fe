import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Card from './components/CardActivity/CardActivity';

function App() {

  return (
    <>
      <Card
        title="MTB - Una pedalata nella natura"
        location="Villa Reale - Monza (MB)"
        date="15/09/2025"
        difficulty="Facile"
        distance="15,7km"
        duration="2h 30min"
        mapImage={""}
      />
    </>
  )
}

export default App
