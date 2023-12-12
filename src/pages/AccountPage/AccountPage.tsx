import React, { useState } from "react";
import styles from "./Account.module.scss";

import { Separator } from "components";
import { UserName } from "./components/UserName";
import { MainView } from "views/layout/MainView";
import { EditProfileModal } from "./components/EditProfileModal";

export const AccountPage: React.FC = () => {
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false);
  const toggleEditProfileModal = () => setEditProfileModal((prev) => !prev);

  return (
    <MainView>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <UserName
            name="Muhammad Akif"
            width="80px"
            height="80px"
            isRounded={true}
            fontSize="24px"
          />
          <Separator height="24px" />
          <div className={styles.username}>Muhammad Akif</div>
          <div className={styles.email}>m.akif.786.dev@gmail.com</div>
          <Separator height="16px" />
          {/* <Button variant="outlined-primary" onClick={toggleEditProfileModal}>
            Edit Profile
          </Button> */}
        </div>
      </div>
      {editProfileModal && (
        <EditProfileModal onClose={toggleEditProfileModal} />
      )}
    </MainView>
  );
};
