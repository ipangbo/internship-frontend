export interface UserForm {
  userId?: number;
  userName: string;
  userPass: string;
  userEmail: string;
  userNickname: string | null;
  userUrl: string | null;
  userStatus: number | null;
  userAvatar: string | null;
  userRegisterTime?: string;
  userLastLoginIp?: string;
  userLastLoginTime?: string;
}
