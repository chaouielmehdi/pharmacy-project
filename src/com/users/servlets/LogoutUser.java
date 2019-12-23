package com.users.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mysql.cj.Session;
import com.pharmacy.dao.DAOUser;
import com.pharmacy.pojo.User;
import com.pharmacy.util.RequestHandler;
import com.pharmacy.util.ResponseHandler;
import com.pharmacy.util.SessionHandler;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/users/logout")
public class LogoutUser extends HttpServlet {
	
	public DAOUser daoUser = new DAOUser();
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// logout
		SessionHandler.logout(request);
	}

}
