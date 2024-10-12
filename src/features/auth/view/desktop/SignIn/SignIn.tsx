import { shallowEqual } from "react-redux";
import block from "bem-cn";

import Button from "components/Button/desktop";
import Input from "components/Inputs/Input/desktop";
import LanguageDropdownSelectorFull from "components/Language/LanguageDropdownSelectorFull/view/desktop";
import Spinner from "components/Spinner/desktop";
import SVG from "components/SVG";

import useAuthForm from "features/auth/model/signIn/useAuthForm";

import { useAppSelector } from "shared/hooks/useAppSelector";
import logoSVG from "shared/img/logo.svg";

import "./SignIn.scss";
import { Link } from "react-router-dom";

const b = block("sign-in-desktop");

const SignIn = () => {
	const locale = useAppSelector((state) => state.locale.common, shallowEqual);
	const loading = useAppSelector((state) => state.auth.loading, shallowEqual);

	const filterData = useAuthForm();

	return (
		<div className={b()}>
			<Spinner isLoading={loading} />

			<SVG className={b("logo")} svgProps={{ src: logoSVG }} />
			<p className={b("title")}>{locale.leadManagement}</p>
			<p className={b("subtitle")}>{locale.authorization}</p>
			<form
				className={b("content")}
				id="login-form"
				name="login-form"
				onSubmit={filterData.onSubmit}
			>
				<div className={b("inputs")}>
					<label className={b("item")} htmlFor="email">
						<div className={b("item-text")}>{locale.email}</div>
						<div className={b("item-field")}>
							<Input
								value={filterData.values.email}
								onChange={(e) =>
									filterData.onChangeEmail(e.target.value.trim())
								}
								id="email"
								name="email"
								autoComplete="email"
								placeholder={locale.email}
							/>
						</div>
					</label>
					<label className={b("item")} htmlFor="current-password">
						<div className={b("item-text")}>{locale.password}</div>
						<div className={b("item-field")}>
							<Input
								value={filterData.values.password}
								onChange={(e) => filterData.onChangePassword(e.target.value)}
								id="current-password"
								name="current-password"
								autoComplete="current-password"
								aria-describedby="password-constraints"
								placeholder={locale.password}
								isPassword
							/>
						</div>
					</label>
				</div>

				<div className={b("bottom")}>
					<div className={b("lang")}>
						<LanguageDropdownSelectorFull />
					</div>
					<div className={b("button")}>
						<Button id="log-in" type="submit" disabled={filterData.disabled}>
							<div className={b("button-text")}>{locale.comeIn} </div>
						</Button>
					</div>
				</div>

				<div className={b("dontHaveAccount")}>
					<span>{locale.dontHaveAccount}</span>
					<Link to="/register" className={b("dontHaveAccount", "register")}>
						{locale.signUp}
					</Link>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
