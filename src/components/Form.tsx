import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface FormProps {
  mode: 'signin' | 'signup';
  textButton: string;
}

const Form: React.FC<FormProps> = ({ mode, textButton }) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userError, setUserError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repasswordError, setRepasswordError] = useState(false);
  const [users, setUsers] = useState();

  useEffect(() => {
    if (mode === 'signup') {
      const validUser = user.length > 0;
      if (user.length > 0) {
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
  }, [email, password, repassword, mode]);

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (mode === 'signup') {
      console.log({
        user,
        email,
        password,
        repassword
      });
    } else {
      console.log({
        user,
        email,
        password,
        remember
      });
    }
  }

  return (
    <>
      <Box component="form" margin="8" onSubmit={(ev: React.FormEvent<HTMLFormElement>) => handleSubmit(ev)}>
        <TextField
          error={userError}
          helperText={userError ? 'Invalid User Name' : ''}
          value={user}
          onChange={ev => setUser(ev.target.value)}
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
            label="Remember Me"
          />
        )}

        <Button disabled={buttonDisabled} type="submit" variant="outlined" fullWidth sx={{ mt: 3, mb: 4 }}>
          {textButton}
        </Button>
      </Box>
    </>
  );
};

export default Form;
