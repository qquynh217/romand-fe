import FormItem from "components/FormItem/FormItem";
import { useSignup } from "hooks/useSignup";

function SignupForm() {
  const { register, handleSubmit, errors, onSubmit, contextHolder } =
    useSignup();
  return (
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      {contextHolder}
      <FormItem
        label="Name*"
        name="name"
        register={register}
        error={errors.name}
      />
      <FormItem
        label="Email*"
        name="email"
        register={register}
        error={errors.email}
      />
      <FormItem
        label="Password*"
        name="password"
        register={register}
        error={errors.password}
        type="password"
      />
      <FormItem
        label="Confirm password*"
        name="confirm"
        register={register}
        error={errors.confirm}
        type="password"
      />
      <button className="app-button">Created</button>
    </form>
  );
}

export default SignupForm;
