import * as React from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearState } from '../store/modules/alertSlice';


const Alerts: React.FC = () => {

    const alert = useAppSelector(state => state.alert)
    const dispatch = useAppDispatch()
    
    return (
        <Snackbar open={alert.open} onClose={() => dispatch(clearState)} autoHideDuration={2000}>
         <Alert severity={alert.success? 'success' : 'error'}>{alert.description}</Alert>
        </Snackbar>
        
    )
}

export default Alerts