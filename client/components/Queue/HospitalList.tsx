import React from "react";
import { List, Card, Title, Paragraph, Subheading } from "react-native-paper";
import { StyleSheet } from "react-native";

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
        <List.Section key={hospital._id} style={styles.hospital}>
          <List.Item key={`${hospital._id}`} title={`${hospital.name}`} />
          <Card>
            <Card.Title title={`${hospital.name}`} />
            <Card.Content>
              <Card.Cover
                source={{
                  uri:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png",
                }}
              />
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

const styles = StyleSheet.create({
  hospital: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 60,
    // width: 20,
    paddingHorizontal: 50,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 25,
    paddingBottom: 10,
  },
});

export default HospitalList;
