import React, {useEffect, useRef} from 'react';
import {ReactComponent as EditIcon} from '@icons/svg/edit.svg';
import {ReactComponent as EnvelopeIcon} from '@icons/svg/envelope.svg';
import {ReactComponent as LinkIcon} from '@icons/svg/link.svg';
import {ReactComponent as UserIcon} from '@icons/svg/user.svg';
import {ReactComponent as TeacherIcon} from '@icons/svg/teacher.svg';
import {ReactComponent as SkillGuruLogo} from '@icons/svg/logo_skillguru.svg';
import {
    StyledContainer,
    StyledNode,
    StyledList,
    StyledIcon, StyledIconWrapper
} from "@newComponents/_registerMentor/RegisterMentorStepperNavigation/RegisterMentorStepperNavigation.styles";
import Typography from "@mui/material/Typography";
import {Theme, useMediaQuery} from "@mui/material";
import useRegisterMentorContext from "../../../context/RegisterMentorContext";

type NavigationContentT = {
    title: string;
    shorthand: string;
    subtitle: string;
    icon: React.ReactNode;
    id: number;
}

const navigationContent: NavigationContentT[] = [
    {
        id: 0,
        title: 'Rejestracja',
        shorthand: 'Rejestracja',
        subtitle: 'Uzupełnij swoje dane, aby zarejestrować się jako mentor',
        icon: <TeacherIcon/>
    },
    {
        id: 1,
        title: 'Informacje o sobie',
        shorthand: 'Informacje o sobie',
        subtitle: 'Uzupełnij informacje o sobie',
        icon: <UserIcon/>
    },
    {
        id: 2,
        title: 'Informacje profilu',
        shorthand: 'Informacje profilu',
        subtitle: 'Uzupełnij swój profil, by przyciągnąć uwagę',
        icon: <EditIcon/>
    },
    {
        id: 3,
        title: 'Portfolio',
        shorthand: 'Portfolio',
        subtitle: 'Uzupełnij swoje portfolio o linki',
        icon: <LinkIcon/>
    },
    {
        id: 4,
        title: 'Zweryfikuj swoje konto',
        shorthand: 'Weryfikacja',
        subtitle: 'Wejdź do swojej skrzynki e-mail, aby zweryfikować konto',
        icon: <EnvelopeIcon/>
    },
]

const RegisterMentorStepperNavigation = () => {
    const {registerMentorState, registerMentorDispatch} = useRegisterMentorContext();
    const isMD = useMediaQuery((theme) => (theme as Theme).breakpoints.down('md'));

    const refsObject = useRef<Record<number, HTMLElement | null>>({});

    useEffect(() => {
        const elementToScroll = refsObject.current[registerMentorState.step];
        if (isMD && !!elementToScroll) elementToScroll.scrollIntoView({inline: "center", behavior: 'smooth'})
    }, [registerMentorState.step, isMD])

    const goToStep = (newStep: number) => {
        if(newStep <= registerMentorState.maxVisitedStep) registerMentorDispatch({ type: "GO_TO_STEP", payload: newStep })
    }

    return (
        <StyledContainer>
            <StyledIconWrapper>
                <SkillGuruLogo/>
            </StyledIconWrapper>
            <StyledList>
                {navigationContent.map(({id, subtitle, icon, title, shorthand}) => (
                    <StyledNode
                        clickable={id <= registerMentorState.maxVisitedStep}
                        onClick={() => goToStep(id)}
                        ref={ref => refsObject.current[id] = ref} active={id === registerMentorState.step}
                        key={id}
                    >
                        <StyledIcon>{icon}</StyledIcon>
                        <Typography color='secondary.contrastText'
                                    variant={isMD ? 'buttonSm' : 'buttonLg'}>{isMD ? shorthand : title}</Typography>
                        {!isMD && <Typography color='secondary.contrastText' variant='caption'>{subtitle}</Typography>}
                    </StyledNode>
                ))}
            </StyledList>
        </StyledContainer>
    )
}

export default RegisterMentorStepperNavigation;
