import { useCallback, useEffect } from "react";
import "./App.css";
import { MarioClient, MarioUsersInfo } from "@pncl/mario";
import { fromEvent } from "rxjs";

interface MarioSyncState extends Record<string, unknown> {
  count: number;
}

let marioClient: MarioClient<MarioSyncState> | null = null;

function App() {
  const initializeMarioClient = useCallback(() => {
    if (!marioClient) {
      marioClient = new MarioClient<MarioSyncState>("*");
      fromEvent(marioClient, "SpaceUsersInfo").subscribe(
        (userInfo: MarioUsersInfo) => {
          console.log("Space Users Sync:", userInfo);
        }
      );
      fromEvent(marioClient, "Sync").subscribe((syncState: MarioSyncState) => {
        console.log("Sync State Update:", syncState);
      });
    }
  }, []);

  useEffect(() => {
    initializeMarioClient();
  }, [initializeMarioClient]);

  return (
    <>
      <div>
        <p>User details:</p>
      </div>
    </>
  );
}

export default App;
