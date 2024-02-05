import { Form, Formik } from "formik";
import Link from "next/link";
import { Col, Input, Label } from "reactstrap";
import FormBtn from "@/Components/Common/FormBtn";
import SimpleInputField from "@/Components/Common/InputFields/SimpleInputField";
import { LogInSchema } from "@/Utils/Hooks/Auth/useLogin";
import { useContext } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { signIn, useSession } from "next-auth/react";

const LoginForm = ({ csrfToken }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const { status } = useSession();

  const login = (data) => {
    signIn("credentials", data);
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LogInSchema}
      onSubmit={login}
    >
      {() => (
        <Form className="row g-4">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          <SimpleInputField
            nameList={[
              {
                name: "username",
                placeholder: t("EmailAddress"),
                title: "Email",
                label: t("EmailAddress"),
              },
              {
                name: "password",
                placeholder: t("EnterPassword"),
                type: "password",
                title: "Password",
                label: "Password",
              },
            ]}
          />

          <Col xs={12}>
            <div className="forgot-box">
              <div className="form-check remember-box">
                <Input
                  className="checkbox_animated check-box"
                  type="checkbox"
                  id="flexCheckDefault"
                />
                <Label className="form-check-label" htmlFor="flexCheckDefault">
                  {t("Rememberme")}
                </Label>
              </div>
              <Link
                href={`/${i18Lang}/auth/forgot-password`}
                className="forgot-password"
              >
                {t("ForgotPassword")}?
              </Link>
            </div>
          </Col>
          <FormBtn
            title={"LogIn"}
            classes={{ btnClass: "btn btn-animation w-100" }}
            loading={status == "loading"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
