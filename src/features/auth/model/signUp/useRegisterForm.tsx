import { useCallback, useMemo, useState } from "react";
import { shallowEqual } from "react-redux";

import { useAppSelector } from "shared/hooks/useAppSelector";
import { useAppDispatch } from "store/store";
import { registerUser } from "store/auth/authThunks";

const useRegisterForm = () => {
	const dispatch = useAppDispatch();

	const { loading } = useAppSelector((state) => state.auth, shallowEqual);

	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		company: "",
		email: "",
		password: "",
	});

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) =>
			setValues((ps) => ({ ...ps, [e.target.name]: e.target.value.trim() })),
		[]
	);

	const disabled = useMemo(
		() =>
			values.email === "" ||
			values.password === "" ||
			values.firstName === "" ||
			values.lastName === "" ||
			values.phone === "" ||
			values.company === "" ||
			loading,
		[
			values.password,
			values.email,
			values.company,
			values.firstName,
			values.lastName,
			values.phone,
			loading,
		]
	);
	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			e.stopPropagation();

			if (!disabled) dispatch(registerUser(values));
		},
		[disabled, values, dispatch]
	);

	return useMemo(
		() => ({
			values,
			disabled,
			handleChange,
			onSubmit,
		}),
		[values, disabled, handleChange, onSubmit]
	);
};

export default useRegisterForm;
