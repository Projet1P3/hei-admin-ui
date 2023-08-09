import React, { useEffect, useState } from 'react';
import { Datagrid, FunctionField, List, TextField } from 'react-admin';
import { Input, Button } from '@mui/material'
import { maxPageSize } from '../../providers/dataProvider';

import { useParams } from 'react-router-dom';
import { transcriptClaim, transcriptRaw } from '../../providers/transcriptProvider';
import authProvider from '../../providers/authProvider';
import { WhoamiRoleEnum } from '../../gen/haClient';

export const UpdateTranscriptVersion = () => {
    const [file, setFile] = useState(null);

    
    const handleFileChange = (event) => {
        const value = event.target.files[0];
        setFile(value);
    };

    const handleSaveVersion = () => {
        if (file) {
            const transcriptPdf = { file: file };
            transcriptRaw.saveOrUpdate(transcriptPdf);
        } else {
            throw new Error("Aucun fichier importé 👀")
        }
    };

    return(
        <div>
            <Input type={"file"} inputProps={{accept:"application/pdf"}} onChange={handleFileChange}/>
            <Button variant="contained" color="primary" onClick={handleSaveVersion}>
                Mettre à jour la version
            </Button>
        </div>
        )
}

const StudentGradeList = () => {
    const params = useParams();
    const definedStudentId = params.studentId;
    const role = authProvider.getCachedRole();

    const [claim, setClaim] = useState({});

    useEffect(async () => {
        const claimResult = await transcriptClaim.getOne("studentId--transcriptId--versionId--claimId")
        setClaim(claimResult)
    }, []);
    return(
        <List
            title={"List version transcript"}
            resource='transcripts'
            label="Transcript"
            filterDefaultValues={{ studentId: definedStudentId }}
            pagination={false}
            perPage={maxPageSize}
        >
            <Datagrid>
                {role === WhoamiRoleEnum.Manager ? <UpdateTranscriptVersion/> : <></>}
                <TextField source="semester" label="Semestre"/>
                <TextField source="academic_year" label="Année académique"/>
                <FunctionField render={record => {console.log(record);}}/>
            </Datagrid>
            <div>
                <h4>Claim</h4>
                <span>Status: {claim.status}</span><br/>
                <span>Raison: {claim.reason}</span>
            </div>
        </List>
    )
}

export { StudentGradeList }