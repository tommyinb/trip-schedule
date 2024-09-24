import "./App.css";
import { Desk } from "./desks/Desk";
import { DeskProvider } from "./desks/DeskProvider";
import { Edit } from "./edits/Edit";
import { List } from "./lists/List";
import { Compute } from "./reads/Compute";
import { ReadProvider } from "./reads/ReadProvider";
import { SaveProvider } from "./saves/SaveProvider";
import { Storage } from "./saves/Storage";
import { Table } from "./tables/Table";
import { Header } from "./trips/Header";
import { TripProvider } from "./trips/TripProvider";

function App() {
  return (
    <div className="App">
      <SaveProvider>
        <TripProvider>
          <Header />

          <ReadProvider>
            <DeskProvider>
              <Edit>
                <Desk>
                  <Table />

                  <List />
                </Desk>
              </Edit>

              <Compute />

              <Storage />
            </DeskProvider>
          </ReadProvider>
        </TripProvider>
      </SaveProvider>
    </div>
  );
}

export default App;
