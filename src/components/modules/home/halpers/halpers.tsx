import React from 'react';
import {
  FileDoneOutlined,
  InfoCircleOutlined,
  PieChartOutlined,
  RiseOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Form, Input, InputNumber, MenuProps, Progress } from 'antd';
import { IEditableCellProps, IEntertainment, IRest } from '../interfaces/interfaces';
import { IAuth } from '../../authorization/interfaces/authorizationInterface';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const items = (userArr: IAuth[]) => {
  return [
    getItem('Dashboard', 'dashboard', <PieChartOutlined />),
    getItem('Reports', 'reports', <RiseOutlined />),
    getItem('Invoices', 'documents', <FileDoneOutlined />, [
      getItem('Invoices', 'invoices'),
      getItem('Drafts', 'drafts'),
      getItem('Templates', 'templates'),
    ]),
    getItem(
      'Customers',
      'customers',
      <UserOutlined />,
      userArr.map((el) => getItem(el.name, el.login))
      //   [
      //   getItem('Customers 1', '1'),
      //   getItem('Customers 2', '2'),
      // ]
    ),
    getItem('Settings', 'settings', <SettingOutlined />),
    getItem('Help & Contact', 'help', <InfoCircleOutlined />),
  ];
};

export const EditableCell: React.FC<IEditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const getPercents = (all: number, numb: number) => {
  return Math.round((numb * 100) / all);
};

export const getDays = (hours: number) => {
  return Math.round(hours / 24);
};

export const renderRow = (key: string, rowData: IRest | IEntertainment, days: string) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ font: '600 24px/34px "SF Pro Display", sans-serif', color: '#28658e' }}>{`${
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rowData[key].title
      } ${
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rowData[key].days
      } ${days}`}</div>
      <Progress
        percent={
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          rowData[key].percent
        }
        showInfo={key !== 'all'}
      />
    </div>
  );
};

export const getDayMonth = (numb: string) => {
  if (Number(numb) <= 10) {
    return `0${numb}`;
  } else return numb;
};

export const renderInfoTable = ({
  data,
  s,
}: {
  data?: { key: string | number; value: string | number }[];
  s: any;
}) => {
  return (
    <table className={s.table}>
      <tbody>
        {data?.map((el, index) => (
          <tr key={index} className={s.tableWrapper}>
            <td className={s.tableLabelWrapper}>
              <div className={s.tableLabel}>{el.key}</div>
            </td>

            <td className={s.tableValueWrapper}>
              <div className={s.tableValue}>{el.value}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
