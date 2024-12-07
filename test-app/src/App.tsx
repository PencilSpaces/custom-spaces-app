import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { MarioClient, MarioUsersInfo } from "@pncl/mario";
import { fromEvent } from "rxjs";

interface MarioSyncState extends Record<string, unknown> {
  count: number;
}

function App() {
  const [spaceUsersInfo, setSpaceUsersInfo] = useState<string>("");
  const [syncState, setSyncState] = useState<MarioSyncState>({ count: 0 });
  const [customEventMessage, setCustomEventMessage] = useState<string>(
    "No message sent / received"
  );
  const marioClient = useRef<MarioClient<MarioSyncState> | null>(null);
  const customEventId = "customEventId";

  const initializeMarioClient = useCallback(() => {
    if (!marioClient.current) {
      marioClient.current = new MarioClient<MarioSyncState>("*");
      fromEvent(marioClient.current, "SpaceUsersInfo").subscribe(
        // This method will be triggered when the client receives the user details of the users in the Space
        (userInfo: MarioUsersInfo) => {
          console.log(
            `${new Date().toLocaleString()}: User details received: ${JSON.stringify(
              userInfo
            )}`
          );
          setSpaceUsersInfo(`${JSON.stringify(userInfo)}`);
        }
      );
      fromEvent(marioClient.current, "Sync").subscribe(
        // This method will be triggered when the client receives a sync state update from the Space
        (syncState: MarioSyncState) => {
          console.log(
            `${new Date().toLocaleString()}: Sync state received: ${JSON.stringify(
              syncState
            )}`
          );
          setSyncState(syncState);
        }
      );

      fromEvent(marioClient.current, "Event").subscribe((data) => {
        // This method will be triggered when the client receives a custom event payload
        console.log(
          `${new Date().toLocaleString()}: Event received: ${JSON.stringify(
            data
          )}`
        );
        setCustomEventMessage(`Received: ${JSON.stringify(data)}`);
      });

      marioClient.current.ready.then(() => {
        console.log(`${new Date().toLocaleString()}: Client is ready!`);
        // Subscribe to custom event. You can unsubscribe using marioClient.unsubscribe(customEventId);
        marioClient.current?.subscribe(customEventId);
      });
    }
  }, []);

  const incrementCount = useCallback(() => {
    const payload = { count: (syncState.count || 0) + 1 };
    console.log(
      `${new Date().toLocaleString()}: Sync state set: ${JSON.stringify(
        payload
      )}`
    );
    marioClient.current?.sync(payload);
  }, [syncState]);

  const sendMessage = () => {
    const payload = {
      eventId: customEventId,
      data: Math.random().toString(36).substring(2, 7),
    };
    console.log(
      `${new Date().toLocaleString()}: Event sent with payload: ${JSON.stringify(
        payload
      )}`
    );
    setCustomEventMessage(`Sent: ${JSON.stringify(payload)}`);
    // Note: This MarioClient will not receive the event it sends
    marioClient.current?.sendEvent(payload);
  };

  useEffect(() => {
    initializeMarioClient();
  }, [initializeMarioClient]);

  return (
    <>
      <div>
        <div className="action-bar">
          <button onClick={incrementCount}>Increment Count</button>
          <button onClick={sendMessage}>Send Random Message</button>
        </div>
        <div className="item-bar">
          <div>Event:</div>
          <div>{customEventMessage}</div>
        </div>
        <div className="item-bar">
          <div>Sync State:</div>
          <div>{`${JSON.stringify(syncState)}`}</div>
        </div>
        <div className="item-bar">
          <div>Users:</div>
          <div>{`${spaceUsersInfo}`}</div>
        </div>
      </div>
    </>
  );
}

export default App;
