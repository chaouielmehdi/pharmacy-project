package com.users.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOUser;
import com.pharmacy.pojo.User;
import com.pharmacy.util.RequestHandler;
import com.pharmacy.util.ResponseHandler;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/users/create") // user in query parameters
public class CreateUser extends HttpServlet {
	public DAOUser daoUser = new DAOUser();
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// initialize user
		User user = RequestHandler.getUser(request);
		
		// validate parameter
		if(daoUser.getOneByUsername(user.getUsername()) != null) {
	        // return the Json result (not a valid user)
	        ResponseHandler.sendJson(null, response);
		}
		else {
			// validate parameter
			if(user != null) {
				daoUser.save(user);
			}
			
	        // return the Json result
	        ResponseHandler.sendJson(user, response);
		}
		
	}

}
