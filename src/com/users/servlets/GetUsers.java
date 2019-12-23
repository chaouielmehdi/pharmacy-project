package com.users.servlets;

import java.io.IOException;
import java.util.List;

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
@WebServlet("/users/getAll")
public class GetUsers extends HttpServlet {
	public DAOUser daoUser = new DAOUser();
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize variable
		List<User> users = null;
		
        // get the user from DB using daoUser
		users = daoUser.getAll();
        
        // return the Json result
		ResponseHandler.sendJson(users, response);
	}

}
