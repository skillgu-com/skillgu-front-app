import React from "react";
import clx from "classnames";
import styles from "../MentorOfferDetails.module.scss";
import { ServiceMentoring } from "@customTypes/order";
import { OfferDetails, OfferStatus } from "@services/offer/offer.service";

export type Props = {
  offerDetails: OfferDetails;
  handleAccept: () => Promise<void>;
  handleReject: () => Promise<void>;
};

export const InProgress = ({
  offerDetails,
  handleAccept,
  handleReject,
}: Props) => {
  return (
    <div>
      <h2>InProgress</h2>

      <p>userFullname: {offerDetails.userFullname}</p>
      <p>userAvatalUrl: {offerDetails.userAvatalUrl}</p>
      <p>mainGoals: {offerDetails.mainGoals.join(", ")}</p>
      <p>timezone: {offerDetails.timezone}</p>
      <p>location: {offerDetails.location}</p>
      <p>aboutStudent: {offerDetails.aboutStudent}</p>
      <p>questionForMentor: {offerDetails.questionForMentor}</p>

      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
};
