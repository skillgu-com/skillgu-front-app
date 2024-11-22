import React from "react";
import { useLottie } from "lottie-react";

export const LottiAnimation = () => {
  const options = {
    animationData: require("./anim.json"),
    loop: false,
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};
