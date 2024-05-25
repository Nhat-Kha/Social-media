import React from "react";
import TrendCard from "../../components/TrendCard/TrendCard";
import Following from "../../components/Following/Following";
import ProfileCardSetting from "../../components/ProfileCard/ProfileCardSetting";
const Profile = () => {
  return (
    <div className="relative grid grid-cols-[18rem_auto_20rem] gap-[1rem]">
      <ProfileCardSetting />
      <Following />
      <div className="flex flex-col gap-[1rem]"></div>
      <TrendCard />
    </div>
  );
};

export default Profile;
