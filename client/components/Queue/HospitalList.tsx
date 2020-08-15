import React from "react";
import { List, Card, Title, Paragraph, Subheading } from "react-native-paper";

import { View } from "../UI/Themed";
import { HospitalProps } from "../types";
import QueueController from "./QueueController";

interface Props {
  hospitals: HospitalProps[];
  queues: number[];
  queuesRef: React.MutableRefObject<number[]>;
  socket: SocketIOClient.Socket;
  setIsTokenRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  setQueues: React.Dispatch<React.SetStateAction<number[]>>;
}

const HospitalList: React.FC<Props> = ({
  hospitals,
  queues,
  socket,
  setIsTokenRegistered,
  setQueues,
}) => {
  return (
    <View>
      <Title>List of Hospitals</Title>
      {hospitals.map((hospital, index) => (
        <List.Section key={hospital._id}>
          <List.Item key={`${hospital._id}`} title={`${hospital.name}`} />
          <Card>
            <Card.Title title={`${hospital.name}`} />
            <Card.Content>
              <Card.Cover
                source={{
                  uri:
                    "https://randomc.net/image/Kaguya%20sama/Kaguya-sama%20wa%20Kokurasetai%20-%2006%20-%20Large%2034.jpg",
                }}
              />
              <Title>{`${hospital.name}`}</Title>
              <Paragraph>test</Paragraph>
            </Card.Content>
          </Card>
          <Subheading>Queue: {queues[index]}</Subheading>
          <View>
            <QueueController
              hospital={hospital}
              setIsTokenRegistered={setIsTokenRegistered}
              socket={socket}
              setQueues={setQueues}
            />
          </View>
        </List.Section>
      ))}
    </View>
  );
};

export default HospitalList;
