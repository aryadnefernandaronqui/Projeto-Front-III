import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { closeAlert } from '../store/modules/alertSlice';


const Alerts: React.FC = () => {

    const alert = useAppSelector(state => state.alert)
    const dispatch = useAppDispatch()


    return (
        <Snackbar open={alert.open} onClose={() => dispatch(closeAlert())} autoHideDuration={2000}>
         <Alert severity={alert.success? 'success' : 'error'}>{alert.description}</Alert>
        </Snackbar>
        
    )
}

export default Alerts