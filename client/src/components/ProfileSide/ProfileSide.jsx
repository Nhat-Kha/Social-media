import React from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
import Following from "../Following/Following";
import CreatePost from "../CreatePost/CreatePost";
import PostSide from "../PostSide/PostSide";
import RightSide from "../RightSide/RightSide";

export default function ProfileSide() {
  return (
    <main class="grid grid-cols-12 gap-6 my-4 w-full">
      <aside className="col-span-3">
        <div className="fixed w-3/12 px-1 mx-2">
          <ProfileCard />
          <Following />
        </div>
      </aside>
      <article className="col-span-6 px-4">
        <CreatePost />
        <PostSide />
      </article>
      <div className="col-span-3 w-10/12">
        <RightSide />
      </div>
    </main>
  );
}
