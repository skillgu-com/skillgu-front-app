import React, {FC} from "react";
import {ServiceMentoringOptionCard} from "../../../components/Cards/ServiceMentoringOptionCard";
import {Button} from "@mui/material";

import {Link, useNavigate, useParams} from "react-router-dom";
import Container from "src/components/Container/Container";

import {Calendar} from "../BookSession/components";
import {useQuery} from "@tanstack/react-query";
import getSubscriptionService, {
    getSubscriptionServiceKeyGenerator
} from "@services/subscription/getSubscription.service";
import Box from "@mui/material/Box";
import styles from "../BookSession/BookSession.module.scss";
import Arrow from "@icons/Arrow";
import NavigateBackButton from "../../../components/NavigateBackButton/NavigateBackButton";
import sharedStyles from "./../../../styles/sharedStyles/selectSessionDatesPage.module.scss";
import {Tag} from "@customTypes/tags";
import {getMentorProfileByID, getMentorProfileByIDKeyGenerator} from "@services/mentor/fetchMentorServices.service";


const MenteeSubscriptionDetailPage: FC = () => {

    const {subscriptionId} = useParams() as { subscriptionId: string };

    const {data: subscriptionData} = useQuery({
        queryKey: getSubscriptionServiceKeyGenerator(subscriptionId),
        queryFn: () => getSubscriptionService(subscriptionId),
    });

    const {data: mentorData} = useQuery({
        // subscriptionData will be defined, it's checked in the enabled property
        queryKey: getMentorProfileByIDKeyGenerator(subscriptionData?.mentorId!),
        // subscriptionData will be defined, it's checked in the enabled property
        queryFn: () => getMentorProfileByID(subscriptionData?.mentorId!),
        enabled: !!subscriptionData?.mentorId,
    });

    // TODO: fetch mentor free slots based on mentorId from subscription data (getMentorAvailabilityByMentorIdService)
    // A:
    // 1. subscription data should contain mentor id, and info about billing period
    //      - why not just mentor free slots? because we neet to display calendar with multiple pages,
    //      so every page should fetch mentor free slots separately
    // 2. subscription data should contain integer representing number of time slots to use by mentee in the billing period
    // 3. subscription data should contain integer representing number of the remaining time slots in current billing period
    // summary: more work needed, but it's final solution

    // B:
    // 1. subscription data should contain mentor free slots until the end of billing period,
    // there is no possibility to book a slot in the next billing period
    // 2. subscription data should contain integer representing time slots count to use by mentee in current billing period
    // summary: easier to implement, but less user friendly

    // both A and B:
    // 1. subscription data should contain selected mentorship option data required for mentorship card

    // TODO: state for store selected slots
    // TODO: Provider for pass selected slots to the 'Selected slots card' to avoid unnecessary rerenders

    return (
        <Container as={Tag.Div}>
            <Box sx={{margin: '24px 16px'}}>
                <NavigateBackButton/>
            </Box>
            <div className={sharedStyles.wrapper}>
                <main className={sharedStyles.main}>
                    <div>Calendar [refactor of 'BookSession/Calendar' component, to make it reusable, or just write new
                        one *TBD*]
                    </div>
                    <div>UserDetail [look on Actions desc]</div>
                    <div>Team [look on Actions desc]</div>
                    <div>Actions [use existing components, but refactor it firstly or find way to reuse/share redux
                        store]
                    </div>
                    <div>FAQ [use existing FAQ component]</div>
                </main>
                <aside>
                    {subscriptionData && (
                        <ServiceMentoringOptionCard
                            mentorProfileReview={mentorData && {
                                firstName: mentorData.firstName,
                                lastName: mentorData.lastName,
                                profileImage: mentorData.profileImage,
                                jobPosition: mentorData.jobPosition,
                                reviewsAvgRate: mentorData.reviewsAvgRate,
                            }}
                            id={subscriptionData.mentorId}
                            title={subscriptionData.mentorshipPlan.title}
                            subtitle={subscriptionData.mentorshipPlan.subtitle}
                            price={subscriptionData.mentorshipPlan.price}
                            descriptionRows={subscriptionData.mentorshipPlan.descriptionRows}
                            variant={subscriptionData.mentorshipPlan.variant}
                            providesMaterials={subscriptionData.mentorshipPlan.providesMaterials}
                            mentoringDescription={subscriptionData.mentorshipPlan.mentoringDescription}
                            responseTimeHours={subscriptionData.mentorshipPlan.responseTimeHours}
                            sessionDurationMinutes={subscriptionData.mentorshipPlan.sessionDurationMinutes}
                            sessionsPerMonth={subscriptionData.mentorshipPlan.sessionsPerMonth}
                            selected
                        />
                    )}
                    <div>Selected slots card [new component]</div>
                </aside>
            </div>
        </Container>
    );
}

export default MenteeSubscriptionDetailPage;