import React, { useState, useEffect, useRef } from "react";
import {
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

interface IUser {
  name: {
    first: string;
    last: string;
  };
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const itemSlidingRefs = useRef<(HTMLIonItemSlidingElement | null)[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((data) => setUsers(data.results))
      .catch((err) => console.error(err));
  }, []);

  const removeUser = (index: number) => {
    itemSlidingRefs.current[index]?.close();
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>It's a list of users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList>
        {users.map((user, index) => (
          <IonItemSliding
            key={index}
            ref={(el) => (itemSlidingRefs.current[index] = el)}
          >
            <IonItem>
              {user.name.first} {user.name.last}
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption onClick={() => removeUser(index)} color="danger">
                Delete
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonList>
    </>
  );
};

export default UserList;
