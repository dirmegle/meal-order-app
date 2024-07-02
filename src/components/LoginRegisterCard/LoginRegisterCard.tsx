import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoHorizontal from '../../assets/icons/logo/logoHorizontal.svg?react';
import BlankCard, { CardContent, CardHeader } from '../BlankCard/BlankCard';
import Tabs from '../Tabs/Tabs';
import TitleAndDescription from '../TitleAndDescription/TitleAndDescription';
import LoginForm from '../Auth/Login/LoginForm';
import RegisterForm from '../Auth/Register/RegisterForm';
import styles from './loginRegisterCard.module.css';

export default function LoginRegisterCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState('Login');

  useEffect(() => {
    const activeTab = location.pathname === '/login' ? 'Login' : 'Register';
    setSelectedTab(activeTab);
  }, [location.pathname]);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    if (tab === 'Register') {
      navigate('/register');
    } else if (tab === 'Login') {
      navigate('/login');
    }
  };

  const renderTabsContent = () =>
    (selectedTab === 'Register' && (
      <>
        <TitleAndDescription
          title="Register"
          description="Join our office foodies today!"
          descriptionHtmlTag="p"
        />
        <RegisterForm />
      </>
    )) ||
    (selectedTab === 'Login' && (
      <>
        <TitleAndDescription
          title="Login"
          description="Lunch won't order itself"
          descriptionHtmlTag="p"
        />
        <LoginForm />
      </>
    ));

  return (
    <BlankCard className={styles.loginRegisterCard}>
      <CardHeader className={styles.loginRegisterCardHeader}>
        <LogoHorizontal width={104} height={51} />
      </CardHeader>
      <CardContent className={styles.loginRegisterCardContent}>
        <Tabs
          isUppercase
          tabsData={[
            {
              label: 'Login',
              isDisabled: false,
              key: 'Login',
            },
            {
              label: 'Register',
              isDisabled: false,
              key: 'Register',
            },
          ]}
          selectedTab={selectedTab}
          setSelectedTab={handleTabChange}>
          {renderTabsContent()}
        </Tabs>
      </CardContent>
    </BlankCard>
  );
}
