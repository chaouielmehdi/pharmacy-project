package com.users.servlets;

import java.io.IOException;
import java.io.PrintWriter;

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
@WebServlet("/users/update") // ?id
public class UpdateUser extends HttpServlet {
	public DAOUser daoUser = new DAOUser();
	
	/**
	 * @see HttpServlet#doPut(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize user
		User user = RequestHandler.getUser(request);
		
		// validate parameter
		if(user != null) {
	        daoUser.update(user);
		}
		
        // return the Json result
        ResponseHandler.sendJson(user, response);
	}

}
