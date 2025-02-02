import React, { useMemo } from 'react';

// import { IGetAllUsersItem } from "api/UserManagement/types";

// import UnbanCell from "components/CustomCells/UnbanCell/desktop/UnbanCell";
// import { TUnbanCell } from "components/CustomCells/UnbanCell/types";
// import UndeleteCell from "components/CustomCells/UndeleteCell/desktop/UndeleteCell";
// import UserLinkCell from "components/CustomCells/UserLinkCell/desktop/UserLinkCell";
import ManageCell from 'components/ManageCell/desktop';
// import { TManageCell } from "components/ManageCell/types";
// import RoleCell from "components/RoleCell/desktop";
// import { TRoleCell } from "components/RoleCell/types";
import { ETableSortDirections, ITableColConfig, ITableRowItem, ITableSort } from 'components/Table/types';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { ELeadStatus, Lead } from 'store/leads/transferredLeads/types';
import { ISelectorListItemSimple } from 'shared/helpers/types';
import { countryItems } from 'features/transferLead/model/data';

export const initialAllUsersSort: ITableSort[] = [
  {
    key: 'balance',
    direction: ETableSortDirections.DEFAULT,
    convertedKey: 'balance',
  },
  {
    key: 'id',
    direction: ETableSortDirections.DEFAULT,
    convertedKey: 'id',
  },
];

// export const mapDataToRoleProps = (data: IGetAllUsersItem) => {
// 	return {
// 		id: String(data.id),
// 		isOrganisation: data.id === -1,
// 		link: `${data.id}`,
// 		role: data.role,
// 		onRoleIconClick: data?.onRoleIconClick,
// 		parents: {
// 			parentAdmin: {
// 				id: data.parentAdminId,
// 				link: `/${data.parentAdminId}`,
// 			},
// 		},
// 	};
// };

export const useTransferredLeadsTableConfig = (): ITableColConfig<Lead>[] => {
  const locale = useAppSelector(state => state.locale.common);
  const companies = useAppSelector(state => state.users.companies);

  return [
    {
      localizationKey: 'recipient',
      key: 'recipient',
      renderBody: data => (
        <div>
          {data.recipient.firstName} {data.recipient.lastName} <br />(
          {companies.find(el => el._id === data.recipient.company)?.name})
        </div>
      ),
    },
    {
      localizationKey: 'firstName',
      key: 'firstName',
    },
    {
      localizationKey: 'lastName',
      key: 'lastName',
    },
    {
      localizationKey: 'phone',
      key: 'phone',
    },
    {
      localizationKey: 'purchaseCountry',
      key: 'purchaseCountry',
      renderBody: data => <div>{countryItems.find(el => el.value === data.purchaseCountry)?.renderElement}</div>,
    },
    {
      localizationKey: 'leadGeolocation',
      key: 'leadGeolocation',
      renderBody: data => <div>{countryItems.find(el => el.value === data.leadGeolocation)?.renderElement}</div>,
    },
    {
      localizationKey: 'details',
      key: 'details',
    },
    {
      localizationKey: 'purchaseTimeframe',
      key: 'purchaseTimeframe',
    },
    {
      localizationKey: 'budget',
      key: 'budget',
    },
    {
      localizationKey: 'installment',
      key: 'installment',
      renderBody: data => <div>{data.installment ? locale.yes : locale.no}</div>,
    },
    {
      localizationKey: 'comments',
      key: 'comments',
    },

    {
      localizationKey: 'status',
      key: 'status',
      renderBody: data => <div>{locale.leadStatuses[data.status]}</div>,
    },
    // {
    // 	key: "manage",
    // 	localizationKey: "manage",
    // 	renderBody: (data) => (
    // 		<div
    // 			style={{
    // 				display: "flex",
    // 				alignItems: "center",
    // 				justifyContent: "center",
    // 				gap: "0.62rem",
    // 			}}
    // 		>
    // 			<ManageCell {...data} />
    // 		</div>
    // 	),
    // },
  ];
};

export const mapUser = data => ({
  id: String(data.id),
  data,
});

export const useLeadStatusItems = (): ISelectorListItemSimple<ELeadStatus>[] => {
  const locale = useAppSelector(state => state.locale.common);

  return [
    {
      value: ELeadStatus.LEAD_SENT,
      key: 'lead_sent',
      renderElement: locale.leadStatuses[ELeadStatus.LEAD_SENT],
      active: false,
    },
    {
      value: ELeadStatus.WORK_IN_PROGRESS,
      key: 'work_in_progress',
      renderElement: locale.leadStatuses[ELeadStatus.WORK_IN_PROGRESS],
      active: false,
    },
    {
      value: ELeadStatus.CALL_SCHEDULED,
      key: 'call_scheduled',
      renderElement: locale.leadStatuses[ELeadStatus.CALL_SCHEDULED],
      active: false,
    },
    {
      value: ELeadStatus.PROPOSAL_SENT,
      key: 'proposal_sent',
      renderElement: locale.leadStatuses[ELeadStatus.PROPOSAL_SENT],
      active: false,
    },
    {
      value: ELeadStatus.IN_NEGOTIATION,
      key: 'in_negotiation',
      renderElement: locale.leadStatuses[ELeadStatus.IN_NEGOTIATION],
      active: false,
    },
    {
      value: ELeadStatus.CLOSED,
      key: 'closed',
      renderElement: locale.leadStatuses[ELeadStatus.CLOSED],
      active: false,
    },
  ];
};

export const useInstallmentItems = (): ISelectorListItemSimple<boolean>[] => {
  const locale = useAppSelector(state => state.locale.common);

  return useMemo(
    () => [
      { value: true, key: 'yes', renderElement: locale.yes, active: false },
      { value: false, key: 'no', renderElement: locale.no, active: false },
    ],
    [locale],
  );
};
