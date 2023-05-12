import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../features/user/userSlice";
import CustomInputForWorkRef from "../../components/CustomInputForwrokRef";

const validateForm = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
const Login = () => {
  const navigate = useNavigate();
  const [loginFn, loginRes] = useLoginUserMutation();
  const { isError, isSuccess, isLoading } = loginRes;

  const { handleSubmit, setError, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validateForm),
  });

  const proccessSubmitForm = async (data) => {
    try {
      const result = await loginFn(data);

      if (result.error?.status === 500) {
        toast.error(result.error.data.message);
      }

      if (result && isSuccess) {
        localStorage.setItem("customer", JSON.stringify(result.data));
        toast.success("Dang  nhap thanh cong");
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form
                method="post"
                onSubmit={handleSubmit(proccessSubmitForm)}
                className="d-flex flex-column gap-15"
              >
                <CustomInputForWorkRef
                  type="email"
                  onChange={(e) => e.target.value}
                  control={control}
                  name="email"
                  placeholder="Email"
                />

                <CustomInputForWorkRef
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => e.target.value}
                  control={control}
                />
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
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

export default Login;
