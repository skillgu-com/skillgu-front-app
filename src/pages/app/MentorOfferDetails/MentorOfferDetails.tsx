import React, { useCallback, useEffect, useState } from "react";
import clx from "classnames";
import styles from "./MentorOfferDetails.module.scss";
import {
  OfferDetails,
  acceptOffer,
  fetchOfferDetails,
  rejectOffer,
  sendRejectionFeedback,
} from "src/services/offer/offer.service";
import { InProgress, Rejected, Accepted } from "./screens";
import {} from "./elements";
import { useParams } from "react-router-dom";
import { Loader } from "src/components/_grouped/loader";
import { MentorOfferDetailsProvider, useMentorOfferDetails } from "./context/MentorOfferDetailsContext";

const MentorOfferDetailsContent = () => {
  const { offer, pending, handleAccept, handleReject, handleFeedback } = useMentorOfferDetails();

  if (pending) {
    return <Loader className={styles.loader} spinner />;
  }

  if (!offer) {
    return null;
  }

  if (offer.status === "rejected") {
    return (
      <Rejected />
    );
  }

  if (offer.status === "accepted") {
    return <Accepted />;
  }

  if (offer.status === "in-progress") {
    return (
      <InProgress />
    );
  }

  return null;
};

export const MentorOfferDetails = () => {
  const { id } = useParams();
  const offerId = Number(id);

  return isNaN(offerId) ? null : (
    <MentorOfferDetailsProvider>
      <MentorOfferDetailsContent />
    </MentorOfferDetailsProvider>
  );
};
