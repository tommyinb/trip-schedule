import "./App.css";
import { Desk } from "./desks/Desk";
import { DeskProvider } from "./desks/DeskProvider";
import { Edit } from "./edits/Edit";
import { EditProvider } from "./edits/EditProvider";
import { Guide } from "./guides/Guide";
import { Compute } from "./reads/Compute";
import { ReadProvider } from "./reads/ReadProvider";
import { Load } from "./saves/Load";
import { Save } from "./saves/Save";
import { SaveProvider } from "./saves/SaveProvider";
import { Header } from "./trips/Header";
import { TripProvider } from "./trips/TripProvider";

function App() {
  return (
    <div className="App">
      <SaveProvider>
        <TripProvider>
          <ReadProvider>
            <DeskProvider>
              <EditProvider>
                <Header />
                <Desk />
                <Edit />

                <Guide />

                <Compute />

                <Load />
                <Save />
              </EditProvider>
            </DeskProvider>
          </ReadProvider>
        </TripProvider>
      </SaveProvider>
    </div>
  );
}

export default App;
