import React, {useEffect, useState} from 'react';
import {TextField, MenuItem, InputBase, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {getAllCategories, getAllSkills} from "../../../services/MentorViewService";

const MentorFilters = ({onFilterChange}) => {
    const [skill, setSkill] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        getAllSkills().then((res) => {
            setSkill(res.data);
        });
        getAllCategories().then((res) => {
            setCategory(res.data);
        });
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        onFilterChange({skill: selectedSkill, category: event.target.value});
    };

    const handleSkillChange = (event) => {
        setSelectedSkill(event.target.value);
        onFilterChange({skill: event.target.value, category: selectedCategory});
    };


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
                id='category'
                select
                label='Kategorie'
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                {category?.map(element => (
                    <MenuItem key={element.uuid} value={element}>{element}</MenuItem>
                ))}
            </TextField>
            <TextField
                id='skills'
                select
                label='Umiejętności'
                value={selectedSkill}
                onChange={handleSkillChange}>
                {skill?.map(element => (
                    <MenuItem key={element.uuid} value={element}>{element}</MenuItem>
                ))}
            </TextField>
            <TextField id='topics' select label='Tematy' defaultValue={1}>
                <MenuItem value={1}>Wszystkie</MenuItem>
            </TextField>
            <TextField id='price' select label='Stawka' defaultValue={1}>
                <MenuItem value={1}>500 zł</MenuItem>
            </TextField>
        </div>
    );
};

export default MentorFilters;