export interface UserStateInterface {
  auth: boolean;
  login: string;
  password: string;
}

const state: UserStateInterface = {
  auth: false,
  login: '',
  password: ''
};

export default state;
