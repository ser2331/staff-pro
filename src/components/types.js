export const routes = {
  login: '/',
  registration: '/registration',
  forgotPassword: '/forgotPassword',
  forgotPasswordSuccess: '/forgotPasswordSuccess',
  changeMail: '/changeMail',
  dashboard: '/dashboard',
  reports: '/reports',
  invoices: '/documents/invoices',
  drafts: '/documents/drafts',
  templates: '/documents/templates',
  customers1: '/customers/1',
  customers2: '/customers/2',
  settings: '/settings',
  help: '/help',
};

export default class Types {
  static reportsTableColumns = [
    { title: 'Описание', dataIndex: 'description' },
    { title: 'Категория', dataIndex: 'category' },
    { title: 'Кол-во', dataIndex: 'amount' },
    { title: 'Цена', dataIndex: 'expectedPrice' },
    { title: 'Стоимость', dataIndex: 'price' },
  ];

  static appSizes = [
    { id: 0, key: 'mobile', size: 320, value: true },
    { id: 1, key: 'desktop', size: 1152, value: false },
  ];

  static appSizesMap = Types.appSizes.reduce(
    (acc, item) => acc.set(item.key, { ...item }),
    new Map()
  );
}
