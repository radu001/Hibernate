package com.google;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.dao.impl.AdminDaoImpl;
import com.google.entity.Admin;
import com.google.exception.DaoException;

public class LoginServlet extends HttpServlet {

	AdminDaoImpl adminDao = new AdminDaoImpl();
	Admin admin = null;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		HttpSession session = req.getSession();
		
		String login = req.getParameter("login");
		String password = req.getParameter("password");
		
		System.out.println(login);
		System.out.println(password);

		
		try {
			admin = adminDao.getAdmin();
		} catch (DaoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if(admin.getPassword().equals(password) && login.equalsIgnoreCase("admin")) {
			session.setAttribute("loggedIn", true);
			resp.sendRedirect("index.jsp");
			System.out.print("login succes");
			return;
		}


		session.setAttribute("invalid", true);
		resp.sendRedirect("signin.jsp");
	}
}
