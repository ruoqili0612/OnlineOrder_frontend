import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signup } from "../utils"; //import utils.js里的signup helper function（API）

//class里面叫做method，外面叫做function
class SignupForm extends React.Component {
  state = {
    displayModal: false, //model:pop up component（弹窗），这里是用boolean来显示是不是要显示弹窗
  };

  handleCancel = () => {
    //method
    this.setState({
      displayModal: false,
    });
  };

  signupOnClick = () => {
    //点击按钮，display model变成true
    this.setState({
      displayModal: true,
    });
  };

  onFinish = (data) => {
    //.then.catch里放的是另外的function
    signup(data) //出来一个promise
      .then(() => {
        //注册成功后把注册的弹窗关掉
        this.setState({
          displayModal: false,
        });
        message.success(`Successfully signed up`); //给用户看的message
      })
      .catch((err) => {
        message.error(err.message); //uiux的设计，这里会直接告诉用户error message。这样设计不好，一般会直接给用户看一个message例如“signed up failed”，给工程师看error message
      });
  };
  //大写的Button是ant design的import（样子长得不一样），小写的是html的tag
  //onClict：react里面用camel case，写html和css用小写
  //class里面需要去调用一个function时要加this，Register是他的名字
  //signupOnClick把modal变成true之后，打开这个modal（弹窗），接下来我们自己写这个modal
  //Modal里面是他的attribute，eg.open决定这个Modal开不开
  //最后submit完之后调用62行的onFinish
  render = () => {
    return (
      <>
        <Button shape="round" type="primary" onClick={this.signupOnClick}>
          Register
        </Button>
        <Modal
          title="Register"
          open={this.state.displayModal}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form
            name="normal_register"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            preserve={false}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="first_name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input placeholder="firstname" />
            </Form.Item>
            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input placeholder="lastname" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
}

export default SignupForm;
