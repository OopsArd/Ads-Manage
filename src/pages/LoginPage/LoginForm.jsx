import {React, useState} from 'react';
import { useNavigate } from 'react-router';
import { useFormik } from "formik";
import axios from 'axios';

import './login.css'

const LoginForm = () => {
  const goRouter = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      await axios
        .post("https://ads-management-backend.onrender.com/auth/signin", values,
        {headers: {
          "Authorization": 'Bearer ' + 'admin',
          "Another-Header": "header-value",  // Add additional headers as needed
        }})
        .then((res) => {
          console.log(res.data);
          const accessToken = res.data.accessToken;
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('role',  res.data.role_type);
          goRouter('/')
        })
        .catch((err) => {
          formik.errors.username = err.response.data.message;
        });
    },
  });


  return (
    <div className='login'>
      <h2>Đăng nhập</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          <span>Tên đăng nhập:</span>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </label>
        <label>
          <span>Mật khẩu:</span>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </label>

        {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}

        <button className='btn' type="submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
