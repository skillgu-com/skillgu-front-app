import React from "react";
import { useBookingReducer } from "src/reducers/booking";
import { MentorServiceCard } from "@newComponents/Cards/MentorServiceCard";

export const SelectedService = () => {
  const [state] = useBookingReducer();

  return state.mentor && state.service ? (
    <MentorServiceCard
      meetingForm="video"
      maxAttendees={5}
      information="Link do spotkania dostaniesz po zatwierdzeniu terminu"
      avatar_url={state.mentor.avatar_url}
      description={state.mentor.description}
      fullName={state.mentor.name}
      profession={state.mentor.profession}
      reviewsAvgRate={String(state.mentor.reviewsAvgRate)}
      reviewsCount={String(state.mentor.reviewsCount)}
      title={state.mentor.title}
      initialDescriptionHeight={40}
      servicePrice={6000}
      serviceDuration={30}
    />
  ) : null;
};
