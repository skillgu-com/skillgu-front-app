import React from "react";
import { useBookingReducer } from "src/reducers/booking";
import { MentorServiceCard } from "@newComponents/Cards/MentorServiceCard";
import {useLocation} from "react-router-dom";
import {ServiceSession} from "@customTypes/order";

export const SelectedService = () => {
  const [state] = useBookingReducer();
  const location = useLocation();

  const sessionData = location.state as ServiceSession;

  return state.mentor && state.service ? (
    <MentorServiceCard
      meetingForm="video"
      maxAttendees={5}
      information="Link do spotkania dostaniesz po zatwierdzeniu terminu"
      avatar_url={state.mentor.avatar_url}
      description={sessionData?.description}
      fullName={state.mentor.name}
      profession={state.mentor.profession}
      reviewsAvgRate={String(state.mentor.reviewsAvgRate)}
      reviewsCount={String(state.mentor.reviewsCount)}
      title={sessionData?.sessionType}
      initialDescriptionHeight={90}
      servicePrice={sessionData?.sessionPrice}
      serviceDuration={sessionData?.meetTime}
    />
  ) : null;
};
