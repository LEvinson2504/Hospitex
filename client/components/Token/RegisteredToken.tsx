import React from "react";

import { View } from "../Themed";
import { Title, Subheading, Button } from "react-native-paper";

type Props = {
  tokenId: string;
  queue: number;
  setIsTokenRegistered: (bool: boolean) => void;
};

const RegisteredToken: React.FC<Props> = ({
  tokenId,
  queue,
  setIsTokenRegistered,
}) => {
  return (
    <View>
      <Title>Your token is: {tokenId}</Title>
      <View>
        <Subheading>Queue: {queue}</Subheading>
        <Button
          onPress={() => {
            setIsTokenRegistered(false);
          }}
        >
          Go back h3h3
        </Button>
      </View>
    </View>
  );
};

export default RegisteredToken;
