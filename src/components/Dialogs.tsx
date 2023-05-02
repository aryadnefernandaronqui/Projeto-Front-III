
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../store/hooks';
import { addTask } from '../store/modules/userLoggedSlice';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface DialogsProps {
  openDialog: boolean,
  actionClose: () => void,
 
}

const Dialogs: React.FC<DialogsProps> = ({openDialog, actionClose}) => {
 
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [clean, setClean] = useState('')

  const dispatch = useAppDispatch()

  const handleClose = () => {
    actionClose()
   
  };

  const handleSave = () => {
    dispatch(addTask({task: taskTitle, description: taskDescription}))
    actionClose()
    setClean('')
  }


  return (
    <div>
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Add a new task here
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Grid container gap={3}>
          <Grid item xs={12}>
          <TextField label='Task Title' fullWidth value={taskTitle} onChange={(ev) => 
            setTaskTitle(ev.target.value)}/>
          </Grid>
          <Grid item xs={12}>
          <TextField label='Task Description' fullWidth value={taskDescription} onChange={(ev) => 
            setTaskDescription(ev.target.value)}/>
          </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus value={clean} onChange={ev => setClean(ev.target.value)} onClick={handleSave}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}


export default Dialogs