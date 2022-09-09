import React, { useCallback, useMemo, useState } from 'react';
import { Button, Drawer } from 'antd';
import { homeSlice } from '../../HomeSlice';
import { CustomContentWrapper } from '../../../../common/components/CustomContentWrapper/CustomContentWrapper';
import { InternetAccounts } from '../InternetAccounts/InternetAccounts';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../core/redux';
import { BankAccounts } from './BankAccounts/BankAccounts';
import { AddBankAccount } from './AddBankAccountForm/AddBankAccount';
import { AddInternetAccount } from './AddInternetAccountForm/AddInternetAccount';

const { setKeyBankAccountsData, setKeyInternetAccountsData } = homeSlice.actions;

const documentsData = (
  title: string,
  breadcrumb: string[],
  tabs: string[],
  buttonTitle: string,
  addNewInvoice: () => void,
  keyBankAccountsData: string
) => {
  const addInvoiceButton = () => {
    return (
      <Button
        type='primary'
        style={{ right: 50 }}
        onClick={addNewInvoice}
        disabled={!!keyBankAccountsData}
      >
        {buttonTitle}
      </Button>
    );
  };
  return {
    title: title,
    breadcrumb: breadcrumb,
    extra: addInvoiceButton(),
    items: [
      {
        label: tabs[0],
        key: 'bank_accounts',
        children: (
          <div style={{ minHeight: 280, padding: '0 24px 0 0' }}>
            <BankAccounts />
          </div>
        ),
      },
      {
        label: tabs[1],
        key: 'internet_accounts',
        children: (
          <div style={{ minHeight: 280, padding: '0 24px 0 0' }}>
            <InternetAccounts />
          </div>
        ),
      },
    ],
  };
};

export const Invoices = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [key, setKey] = useState('bank_accounts');

  const { keyBankAccountsData, keyInternetAccountsData } = useAppSelector(
    (state) => state.homeReducer
  );

  const title = t('invoices');
  const breadcrumb = [t('documents'), t('invoices')];
  const tabs = [t('bank_accounts'), t('internet_accounts')];
  const buttonTitle = t('add_invoice');

  const addNewInvoice = useCallback(() => {
    if (key === 'bank_accounts') {
      dispatch(setKeyBankAccountsData(`key#${Math.random()}`));
    }
    if (key === 'internet_accounts') {
      dispatch(setKeyInternetAccountsData(`key#${Math.random()}`));
    }
    return;
  }, [key]);

  const onClose = useCallback(() => {
    if (key === 'bank_accounts') {
      dispatch(setKeyBankAccountsData(''));
    }
    if (key === 'internet_accounts') {
      dispatch(setKeyInternetAccountsData(''));
    }
    return;
  }, [key]);

  const onChangeTab = useCallback((key: string) => {
    setKey(key);
  }, []);

  const renderBankDrawer = useMemo(() => {
    return (
      <Drawer
        style={{ zIndex: 10000 }}
        title={t('add_invoice')}
        placement='right'
        onClose={onClose}
        open={!!keyBankAccountsData}
      >
        <AddBankAccount onClose={onClose} />
      </Drawer>
    );
  }, [keyBankAccountsData]);
  const renderInternetDrawer = useMemo(() => {
    return (
      <Drawer
        style={{ zIndex: 10000 }}
        title={t('add_invoice')}
        placement='right'
        onClose={onClose}
        open={!!keyInternetAccountsData}
      >
        <AddInternetAccount onClose={onClose} />
      </Drawer>
    );
  }, [keyInternetAccountsData]);

  return (
    <>
      {renderBankDrawer}
      {renderInternetDrawer}
      {CustomContentWrapper(
        documentsData(title, breadcrumb, tabs, buttonTitle, addNewInvoice, keyBankAccountsData),
        onChangeTab
      )}
    </>
  );
};
