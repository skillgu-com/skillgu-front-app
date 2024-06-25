import React, { useEffect, useState } from "react";
import clx from "classnames";
import styles from "../CreateMentoringOffer.module.scss";
import { useCreateOfferReducer } from "src/reducers/createOffer";

export const Build = () => {
  const co = useCreateOfferReducer();

  console.log("Build state", co.createOfferState);

  return (
    <div>
      <h1>Build Step</h1>
      <form>
        <p>Ilość planów: {co.createOfferState.numberOfPlans}</p>
        <div
          style={{ border: "1px solid red", padding: "20px", margin: "20px" }}
        >
          <h3>Basic</h3>
          <p>Schedule: {co.createOfferState.base.schedule}</p>
          <p>Price: {co.createOfferState.base.price}</p>
          <p>Description: {co.createOfferState.base.description}</p>
          <p>numberOfSessions: {co.createOfferState.base.numberOfSessions}</p>
          <p>sessionDuration: {co.createOfferState.base.sessionDuration}</p>
          <p>responseTime: {co.createOfferState.base.responseTime}</p>
          <p>Extra: {co.createOfferState.base.additional[0]}</p>
        </div>
        {co.createOfferState.numberOfPlans > 1 ? (
          <div
            style={{ border: "1px solid red", padding: "20px", margin: "20px" }}
          >
            <h3>Advanced</h3>
            <p>Schedule: {co.createOfferState.advanced.schedule}</p>
            <p>Price: {co.createOfferState.advanced.price}</p>
            <p>Description: {co.createOfferState.advanced.description}</p>
            <p>
              numberOfSessions: {co.createOfferState.advanced.numberOfSessions}
            </p>
            <p>
              sessionDuration: {co.createOfferState.advanced.sessionDuration}
            </p>
            <p>responseTime: {co.createOfferState.advanced.responseTime}</p>
            <p>Extra: {co.createOfferState.advanced.additional[0]}</p>
          </div>
        ) : null}
        {co.createOfferState.numberOfPlans > 2 ? (
          <div
            style={{ border: "1px solid red", padding: "20px", margin: "20px" }}
          >
            <h3>PRO</h3>
            <p>Schedule: {co.createOfferState.pro.schedule}</p>
            <p>Price: {co.createOfferState.pro.price}</p>
            <p>Description: {co.createOfferState.pro.description}</p>
            <p>numberOfSessions: {co.createOfferState.pro.numberOfSessions}</p>
            <p>sessionDuration: {co.createOfferState.pro.sessionDuration}</p>
            <p>responseTime: {co.createOfferState.pro.responseTime}</p>
            <p>Extra: {co.createOfferState.pro.additional[0]}</p>
          </div>
        ) : null}
        <div>
          <p>Dostarczasz materiały?</p>
          <p>{co.createOfferState.providesMaterials ? "TAK" : "NIE"}</p>
        </div>
      </form>
      <button onClick={() => co.prevStep()}>BACK</button>
    </div>
  );
};
