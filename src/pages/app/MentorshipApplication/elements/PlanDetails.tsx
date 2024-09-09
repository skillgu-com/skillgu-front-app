import React from "react";
import { useMentAppReducer } from "src/reducers/mentorship-application";
import { UserIdentity } from "src/components/_base/UserIdentity";
import { MentorshipPlan } from "src/components/_grouped/mentorship-plan";

export const PlanDetails = () => {
  const { state } = useMentAppReducer();
  const { mentor, selectedPlan } = state;
  return selectedPlan && mentor ? (
    <MentorshipPlan
      id={selectedPlan?.id}
      price={selectedPlan.monthlyPrice}
      planIncludes={selectedPlan.included}
      subscriptionVariant={selectedPlan.plan}
      sessionDuration={selectedPlan.sessionDuration}
      sessionsPerMonth={selectedPlan.sessionsPerMonth}
      responseTime={selectedPlan.responseTime}
      userIdentity={
        mentor ? (
          <UserIdentity
            avatarUrl={mentor.avatarUrl}
            avatarSize={56}
            avatarAlt={mentor.fullName}
            title={mentor.fullName}
            subtitle={[mentor.profession, mentor.company].join(" w ")}
            rate={mentor.rate}
          />
        ) : null
      }
      selected
    />
  ) : null;
};
