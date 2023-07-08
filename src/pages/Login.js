import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {TextField, Button, Box, Typography, Alert} from "@mui/material";
import {styled} from "@mui/system";
import useAuthStore from "../authStore";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
});

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "300px",
  width: "100%",
});

const StyledTextField = styled(TextField)({
  marginBottom: "1rem",
});

const StyledButton = styled(Button)({
  alignSelf: "flex-end",
});

function Login() {
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm();
  const login = useAuthStore((state) => state.login);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    const {email, password} = data;
    const success = await login(email, password);

    if (!success) {
      setErrorMessage("Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <StyledBox>
      <Typography variant="h4" component="h1" gutterBottom>
        Đăng nhập
      </Typography>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          label="Email"
          fullWidth
          {...register("email", {required: "Email là bắt buộc"})}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <StyledTextField
          label="Mật khẩu"
          type="password"
          fullWidth
          {...register("password", {required: "Mật khẩu là bắt buộc"})}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <StyledButton variant="contained" color="primary" type="submit">
          Đăng nhập
        </StyledButton>
        {errorMessage && (
          <Alert severity="error" sx={{marginTop: "1rem"}}>
            {errorMessage}
          </Alert>
        )}
      </StyledForm>
    </StyledBox>
  );
}

export default Login;
