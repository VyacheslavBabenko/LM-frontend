/* eslint-disable camelcase */
import React from 'react';

import { ITableSort } from 'components/Table/types';

import { ISelectorListItem } from 'shared/types';

type IStatus = 1 | 2 | 3;

type IType = 0 | 1 | 2;

enum UserLayouts {
  users = 'users',
  admins = 'admins',
  suadmins = 'suadmins',
  cashiers = 'cashiers',
  deleted = 'deleted',
  blocked = 'blocked',
}

type IAllUsersRawFilterData = {
  from: Date | null;
  to: Date | null;
  userID: number | null;
  username: string;
  currency: ISelectorListItem<string>[];
  role: ISelectorListItem<number>[];
  email: string;
  cashierId: number | null;
  adminId: number | null;
  suAdminId: number | null;
  sortTableRow: ITableSort[];
  isBanned?: boolean | null;
  isVisible?: boolean | null;
  page: number;
  itemsOnPage: ISelectorListItem<number>[];
  friendlyTransfersAllowed: boolean;
  selectedUserRole?: null | string;
};

type IAllUsersProcessedFilterData =
  | Partial<{
      limit: number;
      offset: number;
      first_visit__gte: Date | null;
      first_visit__lte: Date | null;
      id?: number;
      parent_cashier_id?: number;
      parent_admin_id?: number;
      parent_suadmin_id?: number;
      currency?: string;
      role?: number;
      email_auth__email__like?: string;
      is_banned?: boolean | null;
      is_visible?: boolean | null;
      order_by?: string;
      friendly_transfers_allowed?: boolean;
      nickname__nickname__like?: string;
    }>
  | URLSearchParams;

interface IAllUsersComponentsInputState {
  values: IAllUsersRawFilterData & {
    disableTransfersToAFriend: boolean;
  };
  onChangeFrom: (value: Date | null) => void;
  onChangeTo: (value: Date | null) => void;
  onChangeUserID: (value: string, role?: string) => void;
  onChangeCashierId: (value: string) => void;
  onChangeAdminId: (value: string) => void;
  onChangeSuAdminId: (value: string) => void;
  onChangeCurrency: (value: ISelectorListItem<string>[]) => void;
  onChangeEmail: (value: string) => void;
  onChangeUsername: (value: string) => void;
  onChangeRole: (value: ISelectorListItem<number>[]) => void;
  onChangeDisabledTransferToFriend: () => void;

  onChangeSortTableRow: (value: ITableSort[]) => void;

  onPageChanged: (value: number) => void;
  onItemsOnPageChanged: (value: ISelectorListItem<number>[]) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

interface IAllUsersComponentsOutputState {
  result: IAllUsersProcessedFilterData | object;
  pageCount: number;
  count: number;
}

interface IAllUsersModel {
  inputState: IAllUsersComponentsInputState;
  outputState: IAllUsersComponentsOutputState;
}

export type {
  IStatus,
  IType,
  IAllUsersRawFilterData,
  IAllUsersProcessedFilterData,
  IAllUsersComponentsInputState,
  IAllUsersComponentsOutputState,
  IAllUsersModel,
};

export { UserLayouts };
