import * as React from 'react';
import Alert from '@mui/material/Alert';

interface AlertsProps {
    alertDescription: string
    severity: 'error' | 'success'
}

const Alerts: React.FC<AlertsProps> = ({alertDescription, severity}) => {
    return (
        <>
        {severity === 'error' ? <Alert severity="error">{alertDescription}</Alert> :
         <Alert severity="success">{alertDescription}</Alert>}
        </>
        
    )
}

export default Alerts