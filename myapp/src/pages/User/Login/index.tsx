import {Footer} from '@/components';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  SafetyCertificateOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {FormattedMessage, history, SelectLang, useIntl, useModel, Helmet,} from '@umijs/max';
import {Alert, Form, Input, message, Tabs} from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, {useEffect, useState} from 'react';
import {flushSync} from 'react-dom';
// @ts-ignore
import {useStyles} from '@/pages/User/Login/styles'
// @ts-ignore


const ActionIcons = () => {
  const {styles} = useStyles();
  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action}/>
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action}/>
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action}/>
    </>
  );
};

const Lang = () => {
  const {styles} = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang/>}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const {styles} = useStyles();
  const intl = useIntl();
  const [imgCode, setImgCode] = useState<string>('');
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    request({
      url: '/captchaImage',
      headers: {
        isToken: false
      },
      method: 'get',
      timeout: 20000
    })

    console.log(data)
    // getCodeImg().then(res => {
    //   console.log(res)
    // })
  }, [])
  const handleCacheCode = async (username?: string, code?: string, uuid?: string): void => {
    const res = await getSmsCode()
    console.log(res)
  }
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({...values, type});
      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const {status, type: loginType} = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang/>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="玄武安全卫士管理系统"
          // subTitle={intl.formatMessage({id: 'pages.layouts.userLayout.title'})}
          subTitle={intl.formatMessage({id: '网吧账号安全全国排名领先'})}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            <FormattedMessage
              key="loginWith"
              id="pages.login.loginWith"
              defaultMessage="其他登录方式"
            />,
            <ActionIcons key="icons"/>,
          ]}
          onFinish={async (values) => {
            console.log(values, 'values')
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                }),
              },
              // {
              //   key: 'mobile',
              //   label: intl.formatMessage({
              //     id: 'pages.login.phoneLogin.tab',
              //     defaultMessage: '手机号登录',
              //   }),
              // },
            ]}
          />
          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误(admin/ant.design)',
              })}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <div style={{display: 'flex'}}>
                <Form.Item rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.imgCode.required"
                        defaultMessage="请输入图片验证码!"
                      />
                    ),
                  },
                ]}>
                  <Input size='large' placeholder='图片验证码' prefix={<SafetyCertificateOutlined/>}></Input>
                </Form.Item>
                <div className={'imgCode'}>
                  <img src={imgCode} alt=""/>
                </div>
              </div>
              <ProFormCaptcha
                name="code"
                captchaProps={{size: 'large'}}
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                rules={[
                  {
                    required: true, message: (<FormattedMessage
                      id="pages.login.code.required"
                      defaultMessage="请输入验证码!"></FormattedMessage>)
                  }
                ]}
                placeholder={intl.formatMessage({id: 'pages.login.code.required', defaultMessage: "请输入验证码！"})}
                onGetCaptcha={async (username) => {
                  console.log(username)
                  handleCacheCode()
                }}></ProFormCaptcha>
            </>
          )}
          {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误"/>}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录"/>
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码"/>
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
