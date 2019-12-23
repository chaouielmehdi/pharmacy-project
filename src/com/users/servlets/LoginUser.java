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
@WebServlet("/users/login")
public class LoginUser extends HttpServlet {
	
	public DAOUser daoUser = new DAOUser();
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		User user = RequestHandler.getUser(request);
		
		// validation
		if(user != null) {
	        // get the user from DB using daoUser
	        user = daoUser.getOneByUsernameAndPassword(user.getUsername(), user.getPassword());
		}
		
		// logIn
		SessionHandler.login(user, request);
		
        // return the Json result
        ResponseHandler.sendJson(user, response);
	}

}
