// import React from "react";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Checkbox, Form, Input, Flex } from "antd";
// import { Link } from "react-router-dom";
// // import GoogleSignInButton from "./GoogleLoginButton/GoogleLoginButton.jsx";
// const Signin = () => {
//   const onFinish = (values) => {
//     const name = values.name;
//     const password = values.password;
//     const remember = values.remember;

//     console.log({ name, password, remember });
//   };
//   return (
//     <div className="flex h-[50vh] items-center justify-center">
//       <Form
//         className="w-full"
//         name="login"
//         initialValues={{ remember: true }}
//         style={{ maxWidth: 360 }}
//         onFinish={onFinish}
//       >
//         <Form.Item
//           name="username"
//           rules={[{ required: true, message: "Please input your Username!" }]}
//         >
//           <Input prefix={<UserOutlined />} placeholder="Username" />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: "Please input your Password!" }]}
//         >
//           <Input
//             prefix={<LockOutlined />}
//             type="password"
//             placeholder="Password"
//           />
//         </Form.Item>
//         <Form.Item>
//           <Flex justify="space-between" align="center">
//             <Form.Item name="remember" valuePropName="checked" noStyle>
//               <Checkbox>Remember me</Checkbox>
//             </Form.Item>
//             <Link>Forgot password</Link>
//           </Flex>
//         </Form.Item>

//         <Form.Item>
//           <Button block type="primary" htmlType="submit">
//             Log in
//           </Button>
//           {/* <GoogleSignInButton /> */}
//           or <Link to="/signup">Sign up now!</Link>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default Signin;
