import React from "react";
import { useSearchParams } from "react-router-dom";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const { updateNotification } = useNotification()
  const navigate = useNavigate()

  // isValid, !isValid

  const isValidToken = async () => {
    const {error, valid} = await verifyPasswordResetToken(token, id)
    if(error) return updateNotification("error", error)
    if(!valid) return navigate("/")
  }

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2  items-center">
            <h1 className="text-4xl font-semibold dark:text-white text:primary">
              Please wait we are verifying your token!
            </h1>
            <ImSpinner3 className="animate-spin  text-4xl dark:text-white text:primary" />
          </div>
        </Container>
      </FormContainer>
    );
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"}>
          <Title>Enter New Password</Title>
          <FormInput
            label="New Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <FormInput
            label="Confirm Password"
            placeholder="********"
            name="confirmPassword"
            type="password"
          />
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}
