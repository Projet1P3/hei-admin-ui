import { Show, SimpleShowLayout, TextField } from "react-admin";
import authProvider from "../../providers/authProvider";
import { useEffect, useState } from "react";
import { transcriptClaim, transcriptVersion } from "../../providers/transcriptProvider";

const StudentGradeShow = (props) => {

  
  const userId = authProvider.getCachedWhoami().id
  const [transcriptId, setTranscriptId] = useState('latest')
  const [versionId, setVersionId] = useState('latest')
  const raId = `${userId}--${transcriptId}--${versionId}`
 const [version, setVersion] = useState({})
 const [claim, setClaim] = useState({})
 useEffect(async () => {
     const claimResult = await transcriptClaim.getOne("studentId--transcriptId--versionId--claimId");
     setClaim(claimResult)
 }, [])
  useEffect(async () => {
    const versionResult = await transcriptVersion.getOne("studentId--transcriptId--versionId");
   setVersion(versionResult)
   console.log(versionResult);
}, []);
console.log(version);
    return (
        <>
          <div>hello  </div>

          <div>
                    <h4>Claim</h4>
                    <span> Status: {claim.status} </span><br />
                </div>
        </>
    )
}

export default StudentGradeShow;