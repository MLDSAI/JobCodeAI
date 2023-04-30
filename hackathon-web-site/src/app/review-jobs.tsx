import React, { useEffect, useState } from 'react';
import { Checkbox, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useLocation, useNavigate } from 'react-router-dom';
import { PineconeClient } from "pinecone-client";



export const ReviewJobs = (props: object) => {
    const navigate = useNavigate();
    const search = useQuery("search");
    const [searchResponse, setSearchResponse] = useState<any[]>([]);

    useEffect(() => {
        if (search) {
            runSearch(search).then(sv => {
                if (sv) {
                    setSearchResponse(sv);
                }
            })
        }
    }, []);

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
                            {searchResponse?.map((sv)=> (
                                <div key={sv.id}>{sv.score}</div>
                            ))}
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

interface IEmbedding {
    embedding: number[];
    index: number;
    object: string;
}

interface IEmbeddingResponse {
    data: IEmbedding[];
    model: string;
    object: string;
    usage: unknown;
}

const runSearch = async (search: string): Promise<any[] | undefined> => {
    
    const queryUrl = "https://openai-e616d50.svc.us-east-1-aws.pinecone.io/query";
    const apiKey = "a1b1fee0-166c-4322-9ccd-6fd6b325585c";
    const headers = {
        "api-key": apiKey,
        "Content-Type": "application/json"
    };
    
    const embedding = await getEmbeddings(search);

    const body = {
        vector: embedding,
        topK: 5,
        includeValues: true
    }

    const res = await fetch(queryUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });
    const json = await res.json();
    const queryResponse = json;

    return queryResponse.matches;
}

const getEmbeddings = async (search: string): Promise<number[]> => {
    const embeddingsURL = "https://api.openai.com/v1/embeddings";
    const apiKey = "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";
    const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
    };
    const body = {
        input: search,
        model: "text-embedding-ada-002"
    };

    const res = await fetch(embeddingsURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });
    const json = await res.json();
    const embedding = json as IEmbeddingResponse;

    if (embedding?.data && Array.isArray(embedding.data) && embedding.data.length >= 1) {
        return embedding.data[0].embedding;
    }

    return [];
}