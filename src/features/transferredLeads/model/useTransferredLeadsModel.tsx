import { useCallback, useEffect, useMemo, useState } from "react";

import { defaultItemsOnPage } from "components/FilterHeader/data";

import {
	initialAllUsersSort,
	useInstallmentItems,
	useLeadStatusItems,
} from "./data";
import { useAppDispatch, useAppSelector } from "shared/hooks/useAppSelector";
import { fetchTransferredLeads } from "store/leads/transferredLeads/transferredLeads";
import {
	countryItems,
	formatUsersToFinder,
	getNoneSelectItem,
} from "features/transferLead/model/data";
import { fetchUsers } from "store/users/usersSlice";
import { formatCompaniesToFinder } from "features/auth/model/signUp/data";

const useModel = () => {
	const dispatch = useAppDispatch();
	const leadStatusItems = useLeadStatusItems();
	const installmentItems = useInstallmentItems();

	const count = useAppSelector((state) => state.transferredLeads.count);
	const refetch = useAppSelector((state) => state.transferredLeads.refetch);
	const locale = useAppSelector((state) => state.locale.common);
	const { users, companies } = useAppSelector((state) => state.users);

	const notChosenItem = useMemo(
		() => getNoneSelectItem(locale.notChosen),
		[locale]
	);

	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		company: [notChosenItem],
		installment: [notChosenItem, ...installmentItems],
		recipient: [notChosenItem],
		country: [notChosenItem, ...countryItems],
		statuses: [notChosenItem, ...leadStatusItems],
		sortTableRow: initialAllUsersSort,

		page: 0,
		itemsOnPage: defaultItemsOnPage,
	});

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	useEffect(() => {
		setValues({
			...values,
			recipient: [notChosenItem, ...formatUsersToFinder(users)],
		});
	}, [users, locale]);

	useEffect(() => {
		setValues({
			...values,
			company: [notChosenItem, ...formatCompaniesToFinder(companies)],
		});
	}, [companies, locale]);

	useEffect(() => {
		setValues((prevValues) => ({
			...prevValues,
			installment: [notChosenItem, ...installmentItems],
			statuses: [notChosenItem, ...leadStatusItems],
			country: [notChosenItem, ...countryItems],
		}));
	}, [locale]);

	const onChangeSortTableRow = useCallback(
		(value) => setValues((ps) => ({ ...ps, sortTableRow: value })),
		[]
	);

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValues((prevValues) => ({
			...prevValues,
			[e.target.name]: e.target.value,
		}));
	}, []);

	const handleCheckboxChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setValues((prevValues) => ({
				...prevValues,
				[e.target.name]: e.target.checked,
			}));
		},
		[]
	);

	const onChangeRecipient = useCallback((value: typeof values.recipient) => {
		setValues((ps) => ({
			...ps,
			recipient: value,
		}));
	}, []);

	const onChangeCountry = useCallback(
		(value: typeof values.country) =>
			setValues((ps) => ({ ...ps, country: value })),
		[]
	);

	const onChangeCompany = useCallback((value: typeof values.company) => {
		setValues((ps) => ({
			...ps,
			company: value,
		}));
	}, []);

	const onChangeStatus = useCallback(
		(value: typeof values.statuses) =>
			setValues((ps) => ({ ...ps, statuses: value })),
		[]
	);

	const onChangeInstallment = useCallback(
		(value: typeof values.installment) =>
			setValues((ps) => ({ ...ps, installment: value })),
		[]
	);

	const onPageChanged = useCallback(
		(value) =>
			setValues((ps) => ({
				...ps,
				page: value,
			})),
		[]
	);
	const onItemsOnPageChanged = useCallback(
		(value) => setValues((ps) => ({ ...ps, itemsOnPage: value })),
		[]
	);

	const pageCount =
		Math.ceil(
			count / Number(values.itemsOnPage.filter((item) => item.active)[0].value)
		) ?? 1;

	const onSubmit = useCallback(
		(e) => {
			e.preventDefault();
			const finalItemsOnPage = values.itemsOnPage
				.filter((s) => s.active)
				.map((s) => s.value)[0];

			const recipientActive = values.recipient.find((el) => el.active);
			const countryActive = values.country.find((el) => el.active);
			const statusActive = values.statuses.find((el) => el.active);
			const installmentActive = values.installment.find((el) => el.active);
			const companiesActive = values.company.find((el) => el.active);

			dispatch(
				fetchTransferredLeads({
					offset: values.page * finalItemsOnPage,
					limit: finalItemsOnPage,
					firstName: values.firstName,
					lastName: values.lastName,
					company: companiesActive?.key !== notChosenItem.key &&
					companiesActive?.value
						? companiesActive.value
						: undefined,
					installment:
						installmentActive?.key !== notChosenItem.key &&
						installmentActive?.value
							? Boolean(installmentActive.value)
							: undefined,
					status:
						statusActive?.key !== notChosenItem.key && statusActive?.value
							? statusActive.value
							: undefined,
					country:
						countryActive?.key !== notChosenItem.key && countryActive?.value
							? countryActive.value.toString()
							: "",
					recipientID:
						recipientActive?.key !== notChosenItem.key && recipientActive?.value
							? recipientActive.value.toString()
							: "",
				})
			);
		},

		[values, dispatch]
	);

	useEffect(() => {
		onSubmit(new Event("submit"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.page, values.sortTableRow, refetch, values.itemsOnPage]);

	useEffect(() => {
		// защита от сильной связанности пагинатора с остальными фильтрами
		if (values.page > pageCount - 1 && pageCount - 1 >= 0)
			onPageChanged(pageCount - 1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.page, pageCount]);

	return useMemo(
		() => ({
			outputState: {
				pageCount,
				count,
			},
			inputState: {
				values,
				handleChange,
				handleCheckboxChange,
				onChangeSortTableRow,
				onChangeRecipient,
				onChangeCountry,
				onChangeStatus,
				onChangeInstallment,
				onChangeCompany,

				onPageChanged,
				onSubmit,
				onItemsOnPageChanged,
			},
		}),
		[
			// items,
			pageCount,
			count,
			values,
			handleChange,
			handleCheckboxChange,
			onChangeSortTableRow,
			onChangeRecipient,
			onChangeCountry,
			onChangeStatus,
			onChangeInstallment,
			onChangeCompany,

			onPageChanged,
			onSubmit,
			onItemsOnPageChanged,
		]
	);
};

export default useModel;
