import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { toast } from "react-toastify"
import {  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import Container from "../components/Container";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"
import CustomInputForWorkRef from "../components/CustomInputForwrokRef";
import { useRegisterUserMutation } from "../features/user/userSlice";


const validateForm = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  mobile: Yup.number().required(),
  password: Yup.string().required()
})
const Signup = () => {
  const navigate = useNavigate()
  const [registerFn, registerRes] = useRegisterUserMutation()
  const { isError, isSuccess, isLoading } = registerRes
  console.log(registerRes)
  const { handleSubmit, setError, reset, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
      mobile: "",
      name: ""
    },
    resolver: yupResolver(validateForm)

  })


  const proccessSubmitForm = async (data) => {
    try {
      // console.log(data)
      await registerFn(data)
      if (!isError && isSuccess) {
        reset();
        toast.success("Dang ki thanh cong")

        navigate("/login")
      }

      if (registerRes.error.status == "500") {
        toast.error(registerRes.error.data.message);
      }

    } catch (error) {
      console.log(error)

    }
  }
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form onSubmit={handleSubmit(proccessSubmitForm)
              } className="d-flex flex-column gap-15">
                <CustomInputForWorkRef
                  type="text"
                  name="name" placeholder="Name"
                  onChange={(e) => e.target.value} control={control} />

                <CustomInputForWorkRef type="email" name="email" placeholder="Email" onChange={(e) => e.target.value} control={control} />
                <CustomInputForWorkRef
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number" onChange={(e) => e.target.value} control={control}
                />
                <CustomInputForWorkRef
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => e.target.value} control={control}
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
