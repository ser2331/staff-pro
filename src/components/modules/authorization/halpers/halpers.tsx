import { IAuth } from '../interfaces/authorizationInterface';

export const searchUser = (
  arr: IAuth[],
  values: IAuth,
  setErrorMessage: (e: string) => void,
  setCurrentUser: (u: IAuth) => void,
  redirect: () => void,
  mes2: string,
  mes1: string
) => {
  const userAdmin = arr.find((el) => el.login === values.login && el.password === values.password);

  if (userAdmin && userAdmin.isAdmin && values?.remember) {
    setErrorMessage('');
    window.localStorage && window.localStorage.setItem('LOGIN', JSON.stringify(userAdmin.login));
    window.localStorage &&
      window.localStorage.setItem('PASSWORD', JSON.stringify(userAdmin.password));
    setCurrentUser(userAdmin);
    return redirect();
  }
  if (userAdmin && userAdmin.isAdmin && !values?.remember) {
    setErrorMessage('');
    setCurrentUser(userAdmin);
    return redirect();
  }
  if (userAdmin && !userAdmin.isAdmin) {
    return setErrorMessage(mes1);
  }
  if (!userAdmin) {
    return setErrorMessage(mes2);
  }
  return;
};

export const userFinder = (
  values: { login: string },
  arrayUsers: IAuth[],
  setErrorMessage: (e: string) => void,
  redirect: () => void,
  setMail: (e: string) => void,
  mes: string
) => {
  const user = arrayUsers.find((el) => el.login === values.login);

  if (user) {
    setErrorMessage('');
    setMail(values.login);
    redirect();
  }
  if (!user) {
    setErrorMessage(mes);
  }
};

export const onChangePassword = (
  values: { password: string },
  arrayUsers: IAuth[],
  redirect: () => void,
  setMail: () => void,
  changeableMail: string,
  setArrWithUserChangedPassword: (e: IAuth[]) => void
) => {
  const user = arrayUsers.find((el) => el.login === changeableMail);
  const newArrUsers: IAuth[] = arrayUsers.filter((el) => el.login !== changeableMail);
  const newArr = () => {
    if (user) {
      return [
        ...newArrUsers,
        { ...user, password: values.password, confirmPassword: values.password },
      ];
    }
    return arrayUsers;
  };

  console.log(newArr());

  if (newArrUsers.length && newArr().length) {
    setMail();
    setArrWithUserChangedPassword(newArr());
    redirect();
  }
};

export const monthOptions = [
  { value: 1, name: '????????????' },
  { value: 2, name: '??????????????' },
  { value: 3, name: '????????' },
  { value: 4, name: '????????????' },
  { value: 5, name: '??????' },
  { value: 6, name: '????????' },
  { value: 7, name: '????????' },
  { value: 8, name: '????????????' },
  { value: 9, name: '????????????????' },
  { value: 10, name: '??????????????' },
  { value: 11, name: '????????????' },
  { value: 12, name: '??????????????' },
];

export const genderOptions = [
  { value: 'male', name: 'Male' },
  { value: 'female', name: 'Female' },
];

export const yearOptions = () => {
  const year = [];
  for (let i = 1920; i < 2022; i++) {
    year.push(1 + i);
  }
  return year;
};
