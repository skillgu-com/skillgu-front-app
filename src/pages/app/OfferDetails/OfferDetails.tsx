import React from "react";
import styles from "./MentorOfferDetails.module.scss";
import {Accepted, InProgress, Rejected} from "./screens";
import {useParams} from "react-router-dom";
import {Loader} from "src/components/_grouped/loader";
import {MentorOfferDetailsProvider, useMentorOfferDetails} from "./context/MentorOfferDetailsContext";
import { useAccountType } from "src/hooks/useAccountType";

const OfferDetailsContent = () => {
  const { offer, pending, handleAccept, handleReject, handleFeedback } = useMentorOfferDetails();
  const {isMentor} = useAccountType();

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

  if (offer.status === "awaiting") {
    return (
      <InProgress isMentor={isMentor} />
    );
  }

  return null;
};

export const OfferDetails = () => {
  const { id } = useParams();
  const offerId = Number(id);

  if(!offerId || isNaN(offerId)){
    return null
  }

  return (
    <MentorOfferDetailsProvider>
      <OfferDetailsContent />
    </MentorOfferDetailsProvider>
  )
};
