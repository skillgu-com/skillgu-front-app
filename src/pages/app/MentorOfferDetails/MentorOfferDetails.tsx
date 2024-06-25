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
import { Sidebar } from "./elements";

export const MentorOfferDetails = () => {
  const offerId = 1; //@TODO
  const [pending, setPending] = useState<boolean>(true);
  const [details, setDetails] = useState<OfferDetails | null>(null);

  const handleAccept = useCallback(async () => {
    setPending(true);
    try {
      await acceptOffer(offerId);
      const data = await fetchOfferDetails(offerId);
      setDetails(data);
    } catch (e) {}
    setPending(false);
  }, []);

  const handleReject = useCallback(async () => {
    try {
      await rejectOffer(offerId);
      const data = await fetchOfferDetails(offerId);
      setDetails(data);
    } catch (e) {}
    setPending(false);
  }, []);

  const handleFeedback = useCallback(async (feedback: string) => {
    try {
      await sendRejectionFeedback(offerId, feedback);
      const data = await fetchOfferDetails(offerId);
      setDetails(data);
    } catch (e) {}
    setPending(false);
  }, []);

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const data = await fetchOfferDetails(offerId);
        setDetails(data);
      } catch (e) {}
      setPending(false);
    };
    getInitialData();
  }, []);

  return pending ? (
    <p>Pending</p>
  ) : details ? (
    <div>
      <main>
        {details.status === "rejected" ? (
          <Rejected
            rejectionFeedback={details.rejectionFeedback}
            handleSendFeedback={handleFeedback}
          />
        ) : details.status === "accepted" ? (
          <Accepted />
        ) : details.status === "in-progress" ? (
          <InProgress
            offerDetails={details}
            handleAccept={handleAccept}
            handleReject={handleReject}
          />
        ) : null}
      </main>
      <aside>
        <Sidebar service={details.service} />
      </aside>
    </div>
  ) : null;
};
