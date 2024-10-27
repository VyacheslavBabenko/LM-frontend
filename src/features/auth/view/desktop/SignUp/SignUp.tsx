import { shallowEqual } from 'react-redux';
import block from 'bem-cn';

import Button from 'components/Button/desktop';
import Input from 'components/Inputs/Input/desktop';
import LanguageDropdownSelectorFull from 'components/Language/LanguageDropdownSelectorFull/view/desktop';
import Spinner from 'components/Spinner/desktop';
import SVG from 'components/SVG';

import useRegisterForm from 'features/auth/model/signUp/useRegisterForm';

import { useAppSelector } from 'shared/hooks/useAppSelector';
import logoSVG from 'shared/img/logo.svg';

import './SignUp.scss';
import { Link } from 'react-router-dom';
import SelectFinder from 'components/Selectors/SelectFinder/desktop';
import InputPhone from 'components/Inputs/InputPhone2/desktop';

const b = block('sign-up-desktop');

const SignUp = () => {
  const locale = useAppSelector(state => state.locale.common, shallowEqual);
  const loading = useAppSelector(state => state.auth.loading, shallowEqual);

  const filterData = useRegisterForm();

  return (
    <div className={b()}>
      <Spinner isLoading={loading} />

      <SVG className={b('logo')} svgProps={{ src: logoSVG }} />
      <p className={b('title')}>{locale.leadManagement}</p>
      <p className={b('subtitle')}>{locale.signUp}</p>
      <form className={b('content')} id="login-form" name="login-form" onSubmit={filterData.onSubmit}>
        <div className={b('inputs')}>
          <label className={b('item')} htmlFor="email">
            <div className={b('item-text')}>{locale.email}</div>
            <div className={b('item-field')}>
              <Input
                value={filterData.values.email}
                onChange={e => filterData.handleChange(e)}
                id="email"
                name="email"
                autoComplete="email"
                placeholder={locale.email}
                error={filterData.validationError.email}
              />
            </div>
          </label>
          <label className={b('item')} htmlFor="firstName">
            <div className={b('item-text')}>{locale.firstName}</div>
            <div className={b('item-field')}>
              <Input
                value={filterData.values.firstName}
                onChange={e => filterData.handleChange(e)}
                id="firstName"
                name="firstName"
                autoComplete="firstName"
                placeholder={locale.firstName}
              />
            </div>
          </label>
          <label className={b('item')} htmlFor="lastName">
            <div className={b('item-text')}>{locale.lastName}</div>
            <div className={b('item-field')}>
              <Input
                value={filterData.values.lastName}
                onChange={e => filterData.handleChange(e)}
                id="lastName"
                name="lastName"
                autoComplete="lastName"
                placeholder={locale.lastName}
              />
            </div>
          </label>
          <label className={b('item')} htmlFor="phone">
            <div className={b('item-text')}>{locale.phone}</div>
            <div className={b('item-field')}>
              <InputPhone
                value={filterData.values.phone}
                onChange={value => filterData.handleChange({ target: { name: 'phone', value } })}
                placeholder="(999) 999-99-99"
                country="ru"
              />
            </div>
          </label>

          <label className={b('item')} htmlFor="company">
            <div className={b('item-text')}>{locale.company}</div>
            <div className={b('item-field')}>
              <SelectFinder items={filterData.values.company} onChange={filterData.onChangeCompany} />
            </div>
          </label>

          <label className={b('item')} htmlFor="password">
            <div className={b('item-text')}>{locale.password}</div>
            <div className={b('item-field')}>
              <Input
                value={filterData.values.password}
                onChange={e => filterData.handleChange(e)}
                id="password"
                name="password"
                autoComplete="password"
                aria-describedby="password-constraints"
                placeholder={locale.password}
                error={filterData.validationError.password}
                isPassword
              />
            </div>
          </label>
        </div>

        <div className={b('bottom')}>
          <div className={b('lang')}>
            <LanguageDropdownSelectorFull />
          </div>
          <div className={b('button')}>
            <Button id="log-in" type="submit" disabled={filterData.disabled}>
              <div className={b('button-text')}>{locale.register} </div>
            </Button>
          </div>
        </div>

        <div className={b('doYouHaveAccount')}>
          <span>{locale.doYouHaveAccount}</span>
          <Link to="/login" className={b('doYouHaveAccount', 'login')}>
            {locale.authorization}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
