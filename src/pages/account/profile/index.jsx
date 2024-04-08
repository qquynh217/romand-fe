import { Avatar } from "antd";
import FormItem from "components/FormItem/FormItem";
import { avatarList } from "constant";
import { useChangeProfile } from "hooks/useChangeProfile";

function Profile() {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    ava,
    handleChangeAva,
    user,
    contextHolder,
  } = useChangeProfile();
  return (
    <div className="profile">
      {contextHolder}
      <h1>Profile</h1>
      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="profile-text-info">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="input-item email"
            disabled
            value={user.email}
          />
          <FormItem
            label="Name"
            register={register}
            name="name"
            error={errors.name}
          />
          <button className="app-button">Save</button>
        </div>
        <div className="profile-avatar">
          <Avatar size={180} src={avatarList[ava]} />
          <button
            type="button"
            className="app-button"
            onClick={handleChangeAva}
          >
            Change
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
