import React, { useEffect, useState } from 'react';
import { Checkbox, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useLocation, useNavigate } from 'react-router-dom';

export const ReviewJobs = (props: object) => {
    const navigate = useNavigate();
    const search = useQuery("search");
    return (
        <div className="wrapper">
            <div className="container">
                <div id="hero" className="rounded">
                    <div className="text-container">
                        <h2>
                            <span>Review jobs for {search}</span>
                        </h2>
                        <div>
                            <h3>
                                <b>Ethics Warning</b> Just like the current process, this workflow will not yield 100%
                                accurate results. Please review the below matched job descriptions
                            </h3>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function useQuery(queryParam: string) {
    // Use get method to retrieve queryParam
    return new URLSearchParams(useLocation().search).get(queryParam);
}
