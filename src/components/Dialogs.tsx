
import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { showAlert } from '../store/modules/alertSlice';
import { createTaskAsyncThunk, updateTaskAsyncThunk } from '../store/modules/userLoggedSlice';
import Task from '../types/task';




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
  task?: Task
}

const Dialogs: React.FC<DialogsProps> = ({openDialog, actionClose, task}) => {
 
  const [taskTitle, setTaskTitle] = useState(task?.title || '')
  const [taskDescription, setTaskDescription] = useState(task?.description || '')
  const dispatch = useAppDispatch()

  const userId = useAppSelector(state => state.userLogged.user.email)

  const handleClose = () => {
    actionClose()
    setTaskTitle('')
    setTaskDescription('')
   
  };

  const handleSave = (event: any) => {
    event.preventDefault()
    if(!taskTitle || !taskDescription){
      dispatch(showAlert({
        open: true, 
        success: false, 
        description: 'All fields must be completed.',
      }))
      return 
    } 
    if(task){
      dispatch(updateTaskAsyncThunk({...task, title: taskTitle, description: taskDescription}))
    } else {
      dispatch(createTaskAsyncThunk({userId, title: taskTitle, description: taskDescription}))
    }
    actionClose()
    setTaskTitle('')
    setTaskDescription('')
    dispatch(showAlert({
      open: true, 
      success: true, 
      description: `Well Done! A task was ${task? 'edited' : 'created'} successfully!`,
    }));
    
  }


  return (
    <div>
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
       <Box component="form" onSubmit={handleSave}>
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
            <Button autoFocus type="submit">
              Save changes
            </Button>
          </DialogActions>
       </Box>
       </BootstrapDialog>
    </div>
  );
}


export default Dialogs

