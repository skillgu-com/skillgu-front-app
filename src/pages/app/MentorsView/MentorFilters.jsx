import React, {useEffect, useState} from 'react';
import {TextField, MenuItem, InputBase, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
    getAllMentorCategories,
    getAllMentoringTopics,
    getAllSessionTypes,
    getAllSkills
} from "../../../services/MentorViewService";

const MentorFilters = ({onFilterChange}) => {
    const [skill, setSkill] = useState([]);
    const [mentorCategoryGroup, setMentorCategoryGroup] = useState([]);
    const [sessionType, setSessionType] = useState([]);
    const [mentoringTopics, setMentoringTopics] = useState([]);

    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSessionType, setSelectedSessionType] = useState('');
    const [selectedMentorType, setSelectedMentorTypes] = useState('');
    const [selectedMentoringTopics, setSelectedMentoringTopics] = useState('');
    const [selectedMentorCategoryGroup, setSelectedMentorCategoryGroup] = useState('');


    useEffect(() => {
        getAllSkills().then((res) => {
            setSkill(res.data);
        });
        getAllMentorCategories().then((res) => {
            setMentorCategoryGroup(res.data);
        });
        // getAllSessionTypes().then((res) => {
        //     console.log(res.data)
        //     setSessionType(res.data);
        // });
        getAllMentoringTopics().then((res) => {
            setMentoringTopics(res.data);
        });


    }, []);


    const handleMentoringTopics = (event) => {
        setSelectedMentoringTopics(event.target.value);
        onFilterChange({skill: selectedSkill, category: event.target.value});
    };

    const handleSkillChange = (event) => {
        setSelectedSkill(event.target.value);
        onFilterChange({skill: event.target.value, category: selectedCategory});
    };

    const handleMentorCategoryGroup = (event) => {
        setSelectedMentorCategoryGroup(event.target.value);
        onFilterChange({skill: selectedSkill, category: selectedCategory, sessionType: event.target.value});
    };

    // const handleMentorTypes = (event) => {
    //     const newMentorType = event.target.value;
    //     setSelectedMentorTypes(newMentorType);
    //     onFilterChange({
    //         skill: selectedSkill,
    //         mentorCategoryGroup: selectedCategory,
    //         sessionType: selectedSessionType,
    //         mentorType: newMentorType
    //     });
    // };


    return (
        <div className='mentor-filters'>
            <div className='mentor-filters__search'>
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder='Szukaj po nazwie'
                    inputProps={{'aria-label': 'search google maps'}}
                />
                <IconButton type='button' sx={{p: '10px'}} aria-label='search'>
                    <SearchIcon/>
                </IconButton>
            </div>
            <TextField
                id='sort'
                select
                label='Sortowanie'
                defaultValue={1}
                className='mentor-filters__sort'>
                <MenuItem value={1}>Domyślne</MenuItem>
            </TextField>
            <TextField
                id='topics'
                select
                label='Tematy Mentoringu'
                value={selectedMentoringTopics}
                onChange={handleMentoringTopics}>
                {mentoringTopics?.map(element => (
                    <MenuItem key={element.id} value={element.name}>{element.name}</MenuItem>
                ))}
            </TextField>
            <TextField
                id='skills'
                select
                label='Umiejętności'
                value={selectedSkill}
                onChange={handleSkillChange}>
                {skill?.map(element => (
                    <MenuItem key={element.id} value={element.name}>{element.name}</MenuItem>
                ))}
            </TextField>
            <TextField id='mentorcategory'
                       select
                       label='Grupy mentorów'
                       value={selectedMentorCategoryGroup}
                       onChange={handleMentorCategoryGroup}>
                {mentorCategoryGroup?.map(element => (
                    <MenuItem key={element.id} value={element.name}>{element.name}</MenuItem>
                ))}
            </TextField>
            {/*<TextField id='mentorTypes'*/}
            {/*           select label='Typy mentorów'*/}
            {/*           value={selectedMentorType}*/}
            {/*           onChange={handleMentorTypes}>*/}
            {/*    {mentorType?.map(element => (*/}
            {/*        <MenuItem key={element.uuid} value={element}>{element}</MenuItem>*/}
            {/*    ))}*/}
            {/*</TextField>*/}
            <TextField id='price' select label='Stawka' defaultValue={1}>
                <MenuItem value={1}>500 zł</MenuItem>
            </TextField>
        </div>
    );
};

export default MentorFilters;
