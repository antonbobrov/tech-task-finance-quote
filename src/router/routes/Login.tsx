import React, { useCallback, useEffect } from 'react';
import {
  Button, Form, Input, message, Space, Spin, Typography,
} from 'antd';
import { useAppSelector } from '../../store';
import useActions from '../../store/actions';

function RouteLogin() {
  const [form] = Form.useForm();
  const auth = useAppSelector((state) => state.auth);
  const actions = useActions();

  useEffect(() => {
    if (auth.error) {
      message.error(auth.error);
    }
  }, [auth.error]);

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      actions.logIn(form.getFieldValue('email'), form.getFieldValue('password'));
    }).catch(() => {});
  }, [actions, form]);

  return (
    <>
      <Typography.Title>Log in</Typography.Title>
      <Form
        form={form}
        disabled={auth.isLoading}
        action=""
        labelAlign="left"
        layout="vertical"
        size="middle"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, type: 'email' },
          ]}
        >
          <Input
            type="email"
            name="email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true },
            {
              pattern: /^([a-zA-Z0-9_]){7,30}$/g,
              message: 'Only latin letters, numbers and underscope (7-30 characters)',
            },
          ]}
        >
          <Input.Password
            type="password"
            name="password"
          />
        </Form.Item>

        <Space wrap size="middle">
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
          <Button
            type="default"
            htmlType="button"
            onClick={() => {
              form.resetFields();
            }}
          >
            Reset
          </Button>
          Use any data
          {auth.isLoading && (
            <Spin />
          )}
        </Space>

      </Form>
    </>
  );
}
export default RouteLogin;
