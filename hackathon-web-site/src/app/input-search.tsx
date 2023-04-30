import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

type Search = {
    search:string
};

export const InputSearch = (props: object) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState<Search>();
    
    const { register, handleSubmit, formState: { errors } } = useForm<Search>();
    
    const onSubmit: SubmitHandler<Search> = async (data: Search) => {
        console.log("form submit event: ", data);

        navigate(`/review-jobs?search=${data.search}`);
        // const response = await fetch("https://nh4tl0ai74.execute-api.us-west-1.amazonaws.com/develop/session", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        // });
    }

    return (
        <div className="wrapper">
            <div className="container">
                <div id="hero" className="rounded">
                    <div className="text-container">
                        <h2>
                            <span>What type of employees can we help you find?</span>
                        </h2>
                        <div>
                            <h3>
                            Examples:
                            <ul>
                                <li>Everyone who works the front desk at a luxury hotel</li>
                                <li>Everyone who works with engineering staff</li>
                            </ul>
                            </h3>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl variant="standard">
                                    <TextField 
                                            style={{background: 'white', marginLeft: '2.5rem', marginBottom: '2rem'}}
                                            id="search-text-field"
                                            {...register("search")}
                                            value={search?.search}
                                            required
                                            variant='outlined'
                                            margin="dense" />
                                    <Button style={{marginLeft: '2.5rem'}} variant="contained" type='submit'>Find Jobs</Button>
                                </FormControl>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}