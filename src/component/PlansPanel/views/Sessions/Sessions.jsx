import React, {useEffect, useState} from 'react';
import CustomButton, {buttonColors, buttonTypes} from '../../../CustomButton';
import SessionItem from './components/SessionItem';
import Modal from '../../../Modal';
import SessionsModal from './components/SessionsModal';
import {useDispatch, useSelector} from "react-redux";


const Sessions = (props) => {
    const {sessions, onChangeHandler, currentSession} = props;
    const [mentorID, setMentorID] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {
        setMentorID(sessions[0].mentorID);
    });

    useEffect(() => {
        dispatch({
            type: 'NEXT_STEP_IN_SESSION_CREATION',
            payload: {
                mentorID: mentorID,
                sessionName: currentSession,
            }
        });
    })

    return (
        <div className='session'>
            <ul className='session__list'>
                {sessions?.map((sessionProps) => (
                    <SessionItem
                        key={sessionProps.id}
                        {...sessionProps}
                        onChangeHandler={onChangeHandler}
                        currentSession={currentSession}
                    />
                ))}
            </ul>
            <CustomButton
                classes='session__button'
                as={buttonTypes.internalLink}
                link={`/session-details/${mentorID}`}>
                Zarezerwuj teraz
            </CustomButton>
            <Modal
                trigger={
                    <CustomButton
                        as={buttonTypes.span}
                        classes='session__button'
                        color={buttonColors.secondary}>
                        Zobacz wszystkie sesje
                    </CustomButton>
                }>
                <SessionsModal
                    sessions={[
                        {
                            title: 'title',
                            description:
                                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum suscipit repellat cumque esse hic similique modi obcaecati deserunt laboriosam, sed dolorum, ut dolorem dolore, eveniet ratione consectetur fuga aut voluptate.',
                            price: 300,
                            minutes: 30,
                        },
                        {
                            title: 'title',
                            description:
                                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum suscipit repellat cumque esse hic similique modi obcaecati deserunt laboriosam, sed dolorum, ut dolorem dolore, eveniet ratione consectetur fuga aut voluptate.',
                            price: 300,
                            minutes: 30,
                        },
                        {
                            title: 'title',
                            description:
                                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum suscipit repellat cumque esse hic similique modi obcaecati deserunt laboriosam, sed dolorum, ut dolorem dolore, eveniet ratione consectetur fuga aut voluptate.',
                            price: 300,
                            minutes: 30,
                        },
                        {
                            title: 'title',
                            description:
                                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum suscipit repellat cumque esse hic similique modi obcaecati deserunt laboriosam, sed dolorum, ut dolorem dolore, eveniet ratione consectetur fuga aut voluptate.',
                            price: 300,
                            minutes: 30,
                        },
                    ]} name='Tester'
                />
            </Modal>
        </div>
    )
        ;
};

export default Sessions;
