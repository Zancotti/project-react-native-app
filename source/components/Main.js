import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import * as Location from "expo-location";
import styled from "styled-components/native";

const Main = () => {
  const [heading, setHeading] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== `granted`) {
      setErrorMessage({
        errorMessage: `Permission to access location was denied!`,
      });
    } else {
      Location.watchHeadingAsync((data) => {
        setHeading(Math.round(data.trueHeading));
      });
    }
  }, []);

  const getCompassText = (heading) => {
    if ((heading >= 337 && heading <= 360) || (heading >= 0 && heading < 22)) {
      return "North";
    } else if (heading >= 22 && heading < 67) {
      return "Northeast";
    } else if (heading >= 67 && heading < 112) {
      return "East";
    } else if (heading >= 112 && heading < 157) {
      return "Southeast";
    } else if (heading >= 157 && heading < 202) {
      return "South";
    } else if (heading >= 202 && heading < 247) {
      return "Southwest";
    } else if (heading >= 247 && heading < 292) {
      return "West";
    } else if (heading >= 292 && heading < 337) {
      return "Northwest";
    }
  };

  let text = "Loading..";
  if (!heading) {
    if (errorMessage) {
      text = errorMessage;
    }
    return (
      <Container>
        <Text>{text}</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Image
        source={require("../../assets/compass.png")}
        style={{
          transform: [{ rotate: 360 - heading + "deg" }],
        }}
      />
      <Text>{heading}&deg;</Text>
      <Text> {getCompassText(heading)}</Text>
    </Container>
  );
};

export default Main;

const Container = styled.View`
  font-size: 18px;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: ${Constants.statusBarHeight};
  background-color: black;
  padding: 24px;
`;

const Text = styled.Text`
  color: white;
  font-size: 24px;
  margin: 0 24px;
  text-align: center;
`;

const Image = styled.Image`
  width: 400px;
  height: 400px;
`;
