import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { maxPageSize } from '../../providers/dataProvider'
import { transcriptClaim } from "../../providers/transcriptProvider"
import { Datagrid, List, TextField } from "react-admin"
import StudentGradeShow from "./StudentGradeShow"

const GradeMenu = () => {
    return (
        <div>
           hello
        </div>
    )

}

const StudentGradeList = (props) => {
    const params = useParams()
    const definedStudentId = params.studentId
    const [claim, setClaim] = useState({})
    const [selectedItem, setSelectedItem] = useState(null)

    useEffect(async () => {
        const claimResult = await transcriptClaim.getOne("studentId--transcriptId--versionId--claimId");
        setClaim(claimResult)
    }, [])
    const handleRowClick = (item) => {

        setSelectedItem(item);
    };

    return (
        <>
            <StudentGradeShow selectedItem={selectedItem} />
            <List
                title={"List version transcript"}
                resource="transcripts"
                label="transcript"
                filterDefaultValues={{ studentId: definedStudentId }}
                pagination={false}
                perPage={maxPageSize}
                {...props}
            >
                <Datagrid rowClick={handleRowClick} expand={GradeMenu}>
                    <TextField source="semester" label="Semestre" />
                    <TextField source="academic_year" label="Années academique" />
                </Datagrid>
                <div>
                    <h4>Claim</h4>
                    <span> Status: {claim.status} </span><br />
                    <span> Raison: {claim.reason} </span>
                </div>
            </List>
        </>
    )
}

export { StudentGradeList } 