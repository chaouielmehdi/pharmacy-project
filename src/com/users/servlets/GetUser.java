package com.users.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOUser;
import com.pharmacy.pojo.User;
import com.pharmacy.util.ResponseHandler;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/users/get") // ?id
public class GetUser extends HttpServlet {
	public DAOUser daoUser = new DAOUser();
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize user
		User user = null;
		String idString = request.getParameter("id");
		
		// validate parameter
		if(!(idString == null || idString == "")) {
			int id = Integer.parseInt(idString);
	        
	        // get the user from DB using daoUser
	        user = daoUser.getOneById(id);
		}
		
        // return the Json result
        ResponseHandler.sendJson(user, response);
	}

}
