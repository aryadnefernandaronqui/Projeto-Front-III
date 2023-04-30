
import { Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addUser } from '../store/modules/userSlice';
import User from '../types/user';

interface FormProps {
  mode: 'signin' | 'signup';
  textButton: string;
}

const Form: React.FC<FormProps> = ({ mode, textButton }) => {
  const dispatch = useAppDispatch()
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repasswordError, setRepasswordError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);



  useEffect(() => {
    if (mode === 'signup') {
      const validUser = userName.length > 0;
      if (userName.length > 0) {
        setUserError(!validUser);
      }

      const validEmail = (email.endsWith('.com') || email.endsWith('.com.br')) && email.includes('@');
      if (email.length > 0) {
        setEmailError(!validEmail);
      }

      const validPassword = password.length >= 6;
      if (password.length > 0) {
        setPasswordError(!validPassword);
      }

      const validRepassword = password === repassword;
      if (repassword.length > 0) {
        setRepasswordError(!validRepassword);
      }

      if (!validUser || !validEmail || !validPassword || !validRepassword) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    }
  }, [userName, email, password, repassword, mode]);

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (mode === 'signup') {
     console.log ({
        userName,
        email,
        password, 
        repassword,
     });

    
      }else {
      console.log({
        userName,
        email,
        password,
        remember
      });
    }
    return
  }
  dispatch(addUser({
    userName, email, password,
    remember: false,
    tasks: []
  }))



  return (
    <>
      <Box component="form" margin="8" onSubmit={(ev: React.FormEvent<HTMLFormElement>) => handleSubmit(ev)}>
        <TextField
          error={userError}
          helperText={userError ? 'Invalid User Name' : ''}
          value={userName}
          onChange={ev => setUserName(ev.target.value)}
          margin="normal"
          type="user"
          id="user"
          label="User"
          variant="standard"
          fullWidth
        />
        <TextField
          error={emailError}
          helperText={emailError ? 'Invalid Email Address' : ''}
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          margin="normal"
          type="email"
          id="email"
          label="E-mail"
          variant="standard"
          fullWidth
        />

        <TextField
          error={passwordError}
          helperText={passwordError ? 'Invalid Password. your password must be at least 6 characters' : ''}
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          margin="normal"
          type="password"
          id="password"
          label="Password"
          variant="standard"
          fullWidth
        />
        {mode === 'signup' ? (
          <TextField
            error={repasswordError}
            helperText={repasswordError ? 'Passwords do NOT match' : ''}
            value={repassword}
            onChange={ev => setRepassword(ev.target.value)}
            margin="normal"
            type="password"
            id="repassword"
            label="Password again, please."
            variant="standard"
            fullWidth
          />
          
        
        ) : (
          <FormControlLabel
              sx={{ alignSelf: 'start' }}
              control={<Checkbox checked={remember} onChange={ev => setRemember(ev.target.checked)} />}
              label="Remember Me" />
              
             
        )}
        <Button disabled={buttonDisabled} type="submit" variant="outlined" fullWidth sx={{ mt: 3, mb: 4 }}>
          {textButton}
        </Button>
        <Grid container>
          <Grid item xs={12} textAlign='center'>
          {mode === 'signup' ? (
          <Link style={{ color: 'inherit' }} href="/signin">Click here to Sign In.
          </Link> 
        ):(<Link style={{ color: 'inherit' }} href="/signup">Click here to Sign Up.
        </Link> )}
          
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Form;

