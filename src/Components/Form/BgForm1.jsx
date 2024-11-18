import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import PageTitle from "../PageTitle";
import { bloodGroupData } from "../../constants/BloodGropuData";
const BgForm1 = () => {
  const [data, setData] = useState(bloodGroupData);

  // console.log(data);

  // handeleNewTodo =(newData)=>{
  // setData([...data,newData])
  // }

  const [newData, setNewData] = useState();
  console.log(newData);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      setData([...data, values]);
      resetForm({ values: "" });
    },
  });

  return (
    <div className="container mx-auto">
      <PageTitle title="Form" />

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center"
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="m-2 rounded border"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="m-2 rounded border"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="m-2 rounded border"
          />
        </div>

        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default BgForm1;

// import React, { useState } from "react";
// import { Button } from "react-bootstrap";

// const BgForm1 = () => {
//   const [name, setEmame] = useState([]);
//   const [email, setEmail] = useState([]);

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };
//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newUser = {
//       name,
//       email,
//       password,
//     };
//     console.log(newUser);
//   };
//   return (
//     <>
//       <form
//         onSubmit={handleFormSubmit}
//         className="m-3 flex flex-col items-center justify-center gap-4"
//       >
//         <div>
//           <label htmlFor="name">
//             Name:
//             <input type="text" className="border" />
//           </label>
//         </div>
//         <div>
//           <label htmlFor="email">
//             {" "}
//             Email:
//             <input type="email" className="border" />
//           </label>
//         </div>
//         <div className="flex flex-col">
//           <label htmlFor="radio">
//             <input type="radio" name="a+" id="" value="a+" /> A+
//           </label>
//           <label htmlFor="radio">
//             <input type="radio" name="a+" id="" value="a+" /> A+
//           </label>
//           <label htmlFor="radio">
//             <input type="radio" name="a+" id="" value="a+" /> A+
//           </label>
//         </div>
//         <div>
//           <Button type="submit">submit</Button>
//         </div>{" "}
//       </form>
//     </>
//   );
// };

// export default BgForm1;
