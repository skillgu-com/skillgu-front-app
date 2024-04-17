import React, {useEffect, useRef} from 'react';
import {ReactComponent as EditIcon} from '@icons/svg/edit.svg';
import {ReactComponent as EnvelopeIcon} from '@icons/svg/envelope.svg';
import {ReactComponent as LinkIcon} from '@icons/svg/link.svg';
import {ReactComponent as UserIcon} from '@icons/svg/user.svg';
import {ReactComponent as TeacherIcon} from '@icons/svg/teacher.svg';
import {ReactComponent as SkillGuruLogo} from '@icons/svg/logo_skillguru.svg';
import useUrlStepper from "../../../hooks/useUrlStepper";
import {
    StyledContainer,
    StyledNode,
    StyledList,
    StyledIcon
} from "@newComponents/_registerMentor/RegisterMentorStepperNavigation/RegisterMentorStepperNavigation.styles";
import Typography from "@mui/material/Typography";
import {Theme, useMediaQuery} from "@mui/material";

type NavigationContentT = {
    title: string;
    shorthand: string;
    subtitle: string;
    icon: React.ReactNode;
    id: number;
}

const navigationContent: NavigationContentT[] = [
    {
        id: 1,
        title: 'Rejestracja',
        shorthand: 'Rejestracja',
        subtitle: 'Uzupełnij swoje dane, aby zarejestrować się jako mentor',
        icon: <TeacherIcon/>
    },
    {
        id: 2,
        title: 'Weryfikacja adresu e-mail',
        shorthand: 'E‑mail',
        subtitle: 'Wejdź do swojej skrzynki e-mail, aby zweryfikować konto',
        icon: <EnvelopeIcon/>
    },
    {
        id: 3,
        title: 'Informacje o sobie',
        shorthand: 'Informacje o sobie',
        subtitle: 'Uzupełnij informacje o sobie',
        icon: <UserIcon/>
    },
    {
        id: 4,
        title: 'Informacje profilu',
        shorthand: 'Informacje profilu',
        subtitle: 'Uzupełnij swój profil, by przyciągnąć uwagę',
        icon: <EditIcon/>
    },
    {
        id: 5,
        title: 'Portfolio',
        shorthand: 'Portfolio',
        subtitle: 'Uzupełnij swoje portfolio o linki',
        icon: <LinkIcon/>
    },
]

const RegisterMentorStepperNavigation = () => {
    const {step  } = useUrlStepper();
    const isMD = useMediaQuery((theme) => (theme as Theme).breakpoints.down('md'));

    const refsTable = useRef<Record<number,HTMLElement | null>>({});

    useEffect(() => {
        const elementToScroll = refsTable.current[step];
        if(isMD && !!elementToScroll) elementToScroll.scrollIntoView({inline: "center", behavior: 'smooth'})
    }, [step, isMD])

    return (
        <StyledContainer>
            <SkillGuruLogo/>
            <StyledList>
                {navigationContent.map(({id, subtitle, icon, title, shorthand}) => (
                    <StyledNode ref={ref => refsTable.current[id] = ref} active={id === step} key={id}>
                        <StyledIcon>{icon}</StyledIcon>
                        <Typography color='secondary.contrastText' variant={isMD ? 'buttonSm' : 'buttonLg'}>{isMD ? shorthand : title}</Typography>
                        {!isMD && <Typography color='secondary.contrastText' variant='caption'>{subtitle}</Typography>}
                    </StyledNode>
                ))}
            </StyledList>
        </StyledContainer>
    )
}

export default RegisterMentorStepperNavigation;
