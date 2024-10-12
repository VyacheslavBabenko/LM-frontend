import { useMemo } from "react";

import allUsers from "./img/allUsers.svg";
import allUsersA from "./img/allUsersA.svg";
import main from "./img/main.svg";
import mainA from "./img/mainA.svg";
import royaltyStatistics from "./img/royaltyStatistics.svg";
import royaltyStatisticsA from "./img/royaltyStatisticsA.svg";
import royaltyStatisticsUSD from "./img/royaltyStatisticsUSD.svg";
import royaltyStatisticsUSDA from "./img/royaltyStatisticsUSDA.svg";
import topUpWithdrawal from "./img/topUpWithdrawal.svg";
import topUpWithdrawalA from "./img/topUpWithdrawalA.svg";
import transfersferredLeads from "./img/transfersferredLeads.svg";
import transfersferredLeadsA from "./img/transfersferredLeadsA.svg";
import receivedLeads from "./img/receivedLeads.svg";
import receivedLeadsA from "./img/receivedLeadsA.svg";
import { useAppSelector } from "shared/hooks/useAppSelector";

const useMainItem = () => {
	const locale = useAppSelector((state) => state.locale.common);

	return useMemo(
		() => ({
			to: "/",
			svg: main,
			svgActive: mainA,
			text: locale.main,
			activeLinks: ["/"],
			// activeLinkExceptions: [],
		}),
		[locale]
	);
};

const useItems = () => {
	const locale = useAppSelector((state) => state.locale.common);

	return useMemo(
		() => [
			{
				title: locale.leads,
				items: [
					{
						to: "/transfer-lead",
						svg: topUpWithdrawal,
						svgActive: topUpWithdrawalA,
						text: locale.transferLead,
						activeLinks: ["/transfer-lead"],
						// activeLinkExceptions: [],
					},
					{
						to: "/transferred-leads",
						svg: transfersferredLeads,
						svgActive: transfersferredLeadsA,
						text: locale.transferredLeads,
						activeLinks: ["/transferred-leads"],
						// activeLinkExceptions: [],
					},
					{
						to: "/received-leads",
						svg: receivedLeads,
						svgActive: receivedLeadsA,
						text: locale.receivedLeads,
						activeLinks: ["/received-leads"],
						// activeLinkExceptions: [],
					},
				],
			},
			// {
			// 	title: locale.userManagement,
			// 	items: [
			// 		{
			// 			to: "",
			// 			svg: allUsers,
			// 			svgActive: allUsersA,
			// 			text: locale.allUsers,
			// 			activeLinks: [""],
			// 			// activeLinkExceptions: [],
			// 		},
			// 	],
			// },

			// {
			// 	title: locale.shareOfRevenue,
			// 	items: [
			// 		{
			// 			to: "",
			// 			svg: royaltyStatisticsUSD,
			// 			svgActive: royaltyStatisticsUSDA,
			// 			text: locale.royaltyStatisticsUSD,
			// 			activeLinks: [""],
			// 			// activeLinkExceptions: [],
			// 		},
			// 	],
			// },
			// {
			// 	title: locale.report,
			// 	items: [
			// 		{
			// 			to: "",
			// 			svg: royaltyStatistics,
			// 			svgActive: royaltyStatisticsA,
			// 			text: locale.royaltyStatistics,
			// 			activeLinks: [""],
			// 			// activeLinkExceptions: [],
			// 		},
			// 	],
			// },
		],
		[locale]
	);
};

export { useMainItem, useItems };
