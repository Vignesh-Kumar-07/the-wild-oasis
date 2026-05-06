/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, reset, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  const { signUp, isSigningUp } = useSignUp();
  function onSubmit({ fullName, email, password }) {
    // console.log(data);

    signUp({ fullName, email, password }, { onSuccess: () => reset() });
  }
  function onError(error) {
    console.log(error);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", { required: "This field is reqiured*" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          disabled={isSigningUp}
          id="email"
          {...register("email", {
            required: "This feild is required*.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please give a proper email.",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isSigningUp}
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required*",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "This field is required*",
            validate: (value) => {
              return (
                value === getValues().password || "Password did not match."
              );
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isSigningUp}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
