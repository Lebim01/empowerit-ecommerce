import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import { Col, Input, Label } from "reactstrap";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";
import {
  YupObject,
  emailSchema,
  nameSchema,
  lastnameSchema,
  passwordConfirmationSchema,
  passwordSchema,
} from "@/Utils/Validation/ValidationSchemas";
import FormBtn from "@/Components/Common/FormBtn";
import SimpleInputField from "@/Components/Common/InputFields/SimpleInputField";
import request from "@/Utils/AxiosUtils";
import { RegisterAPI } from "@/Utils/AxiosUtils/API";

const RegisterForm = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [agree, setAgree] = useState(false);

  const signUp = async (values) => {
    const res = await request({
      url: RegisterAPI,
      method: "POST",
      data: values,
    });
    console.log(res);
  };

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        country_code: "52",
      }}
      validationSchema={YupObject({
        first_name: nameSchema,
        last_name: lastnameSchema,
        email: emailSchema,
        password: passwordSchema,
        password_confirmation: passwordConfirmationSchema,
      })}
      onSubmit={(values) => {
        // Add your logic here
        signUp(values);
      }}
    >
      {({ values }) => (
        <Form className="row g-md-4 g-3">
          <SimpleInputField
            nameList={[
              {
                name: "first_name",
                placeholder: "",
                title: "Name",
                label: t("FirstName"),
              },
              {
                name: "last_name",
                placeholder: `(${t("Optional")})`,
                title: "Last Name",
                label: `${t("LastName")} (${t("Optional")})`,
              },
              {
                name: "email",
                placeholder: t("EmailAddress"),
                title: "Email",
                label: "EmailAddress",
              },
              {
                name: "password",
                placeholder: t("Password"),
                type: "password",
                title: "Password",
                label: "Password",
              },
              {
                name: "password_confirmation",
                type: "password",
                placeholder: t("ConfirmPassword"),
                title: "ConfirmPassword",
                label: "ConfirmPassword",
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
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <Label className="form-check-label" htmlFor="flexCheckDefault">
                  {t("Iagreewith")}
                  <span>{t("Terms")}</span> {t("and")}{" "}
                  <span>{t("Privacy")}</span>
                </Label>
              </div>
            </div>
          </Col>
          <FormBtn
            title={"SignUp"}
            classes={{ btnClass: "btn btn-animation w-100" }}
            disabled={!agree}
            loading={false}
          />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
