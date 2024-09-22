import "./App.css";
import { Desk } from "./desks/Desk";
import { DeskProvider } from "./desks/DeskProvider";
import { Edit } from "./edits/Edit";
import { Compute } from "./reads/Compute";
import { ReadProvider } from "./reads/ReadProvider";
import { Table } from "./tables/Table";
import { TripProvider } from "./trips/TripProvider";

function App() {
  return (
    <div className="App">
      <h1>Trip Schedule</h1>

      <TripProvider>
        <ReadProvider>
          <DeskProvider>
            <Edit>
              <Desk>
                <Table />
              </Desk>
            </Edit>

            <Compute />
          </DeskProvider>
        </ReadProvider>
      </TripProvider>
    </div>
  );
}

export default App;
