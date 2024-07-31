import React, {FC} from "react";
import {ServiceMentoringOptionCard} from "../../../components/Cards/ServiceMentoringOptionCard";
import {Container} from "@mui/material";
import {useParams} from "react-router-dom";
import {Calendar} from "../BookSession/components";

const StudentSubscriptionDetailPage: FC = () => {
    const { subscriptionId } = useParams() as { subscriptionId: string };
    // TODO: fetch subscription data based on subscriptionId
    // A:
    // 1. subscription data should contain mentor id, and info about billing period
    //      - why not just mentor free slots? because we need to display calendar with multiple pages,
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
        <Container>
            <div>
                <main>
                    <div>Calendar [refactor of 'BookSession/Calendar' component, to make it reusable, or just write new one *TBD*]</div>
                    <div>UserDetail [look on Actions desc]</div>
                    <div>Team [look on Actions desc]</div>
                    <div>Actions [use existing components, but refactor it firstly or find way to reuse/share redux store]</div>
                    <div>FAQ [use existing FAQ component]</div>
                </main>
                <aside>
                    <div>Mentorship Card [I'm counting on just pass data to 'ServiceMentoringOptionCard']</div>
                    <div>Selected slots card [new component]</div>
                </aside>
            </div>
        </Container>
    );
}

export default StudentSubscriptionDetailPage;