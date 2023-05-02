import React, { useEffect, useState } from "react";
import { commonModalClasses } from "../../utils/theme";

import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useAuth, useNotification } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/helper";

const validateUserInfo = ({ email, password }) => {
  

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);
    handleLogin(userInfo.email, userInfo.password);
  };

  useEffect(() => {
    // we want to move our user somewhere else
    if(isLoggedIn) navigate("/")
  }, [isLoggedIn])

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign in</Title>
          <FormInput
            value={userInfo.email}
            onChange={handleChange}
            label="Email"
            placeholder="Eben@email.com"
            name="email"
          />
          <FormInput
            value={userInfo.password}
            onChange={handleChange}
            label="Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit value="Sign in" busy={isPending} />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createUser } from "../../api/auth";
// import { useNotification } from "../../hooks";
// import { commonModalClasses } from "../../utils/theme";
// import Container from "../Container";
// import CustomLink from "../CustomLink";
// import FormContainer from "../form/FormContainer";
// import FormInput from "../form/FormInput";
// import Submit from "../form/Submit";
// import Title from "../form/Title";

// const validateUserInfo = ({ name, email, password }) => {
//   const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   const isValidName = /^[a-z A-Z]+$/;

//   if (!name.trim()) return { ok: false, error: "Name is missing!" };
//   if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

//   if (!email.trim()) return { ok: false, error: "Email is missing!" };
//   if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email!" };

//   if (!password.trim()) return { ok: false, error: "Password is missing!" };
//   if (password.length < 8)
//     return { ok: false, error: "Password must be 8 characters long!" };

//   return { ok: true };
// };

// export default function Signup() {
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const { updateNotification } = useNotification();

//   const handleChange = ({ target }) => {
//     const { name, value } = target;
//     setUserInfo({ ...userInfo, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { ok, error } = validateUserInfo(userInfo);

//     if (!ok) return updateNotification("error", error);

//     const response = await createUser(userInfo);
//     if (response.error) return console.log(response.error);

//     navigate("/auth/verification", {
//       state: { user: response.user },
//       replace: true,
//     });
//   };

//   const { name, email, password } = userInfo;

//   return (
//     <FormContainer>
//       <Container>
//         <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
//           <Title>Sign up</Title>
//           <FormInput
//             value={name}
//             onChange={handleChange}
//             label="Name"
//             placeholder="John Doe"
//             name="name"
//           />
//           <FormInput
//             value={email}
//             onChange={handleChange}
//             label="Email"
//             placeholder="john@email.com"
//             name="email"
//           />
//           <FormInput
//             value={password}
//             onChange={handleChange}
//             label="Password"
//             placeholder="********"
//             name="password"
//             type="password"
//           />
//           <Submit value="Sign up" />

//           <div className="flex justify-between">
//             <CustomLink to="/auth/forget-password">Forget password</CustomLink>
//             <CustomLink to="/auth/signin">Sign in</CustomLink>
//           </div>
//         </form>
//       </Container>
//     </FormContainer>
//   );
// }