import * as React from "react";
import {useAuth} from "../../auth/AuthProvider";
import {Box, Button, CircularProgress, Container, TextField} from "@mui/material";
import {useAppSelector} from "../../redux/hooks";
import {getIsPending} from "../../redux/authSlice";
import "./LoginView.scss";

export default function LoginView() {
  let auth = useAuth();
  const isPending: boolean = useAppSelector(getIsPending);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    let password = formData.get("password") as string;

    auth.login(username, password);
  }

  return (
    <Container className="LoginView" maxWidth="xs">

      <Box sx={{margin: "4em 0"}}>
        <h1>Clinical Portal</h1>
        <h1>Sign In</h1>
      </Box>

      <Box>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField name="username" required label="Username" variant="outlined"/>
          </div>
          <div>
            <TextField name="password" type="password" required label="Password" variant="outlined"/>
          </div>
          <div>
            <Button variant="contained" type="submit" disabled={isPending}>
              {!isPending && <span>Login</span>}
              {isPending && <CircularProgress/>}
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
}
