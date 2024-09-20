import "./App.css";
import { Desk } from "./desks/Desk";
import { Table } from "./tables/Table";
import { TripProvider } from "./trips/TripProvider";

function App() {
  return (
    <div className="App">
      <h1>Trip Schedule</h1>

      <TripProvider>
        <Desk>
          <Table />
        </Desk>
      </TripProvider>
    </div>
  );
}

export default App;
