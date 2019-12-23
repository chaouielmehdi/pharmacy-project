package com.users.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pharmacy.dao.DAOUser;
import com.pharmacy.pojo.User;

/**
 * Servlet implementation class GetServlet
 */
@WebServlet("/users/delete") // ?id
public class DeleteUser extends HttpServlet {
	public DAOUser daoUser = new DAOUser();
	
	/**
	 * @see HttpServlet#doDelete(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		// initialize parameter
		String idString = request.getParameter("id");
		
		// validate parameter
		if(!(idString == null || idString == "")) {
	        // delete the user
			int id = Integer.parseInt(idString);
	        daoUser.deleteOneById(id);
		}
	}

}
